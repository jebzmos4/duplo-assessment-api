/* eslint-disable @typescript-eslint/no-var-requires */
/**
 *        @file user_service.ts
 *  @repository
 * @application
 *     @summary UserService Class
 * @description Define Functions that perform CRUD operations on users
 *   @functions - createToken()
 *              - verifyToken()
 *              - getAllUsers()
 *              - addUser()
 *              - login()
 *              - getUserAndAuthToken()
 *              - forgotPassword()
 *              - changePassword()
 *              - getDefaultUser()
 */

import jwt from 'njwt';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import events from '../events';
import * as config from '../config';
import { User } from '../entities/User';

import { CommonService } from '../services';
import { logger } from '../providers/logger';

interface verifyEmail {
  token: string;
  email: string;
}

export class UserService extends CommonService {
  expReq?: any;

  expRes?: any;

  salt: number;

  constructor(_user: any) {
    super(_user);
    this.salt = 10;
  }

  public static async createToken(user: User): Promise<any> {
    const server = config.server;
    const claims = {
      sub: user.id,
      iss: server.hostname
    };

    const jwtObj = jwt.create(claims, server.apiUuid);

    jwtObj.setExpiration(
      new Date().getTime() +
        server.tokenExpiration!.days * 24 * 60 * 60 * 1000 +
        server.tokenExpiration!.hours * 60 * 60 * 1000 +
        server.tokenExpiration!.minutes * 60 * 1000 +
        server.tokenExpiration!.seconds * 1000
    );
    // const tokenId = jwtObj.body.jti;
    logger.info(jwtObj);
    const token = jwtObj.compact();

    return {
      token,
      tokenId: ''
    };
  }

  static async generateOTP() {
    return Array(6 || 30)
      .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
      .map((x) => x[Math.floor(Math.random() * x.length)])
      .join("");
  }

  public static verifyToken(bearer: string): Promise<any> {
    try {
      const token = jwt.verify(bearer, config.server.apiUuid);
      return Promise.resolve({ success: true, token });
    } catch (err) {
      return Promise.reject({ success: false, error: err });
    }
  }

  public static async register(body: any): Promise<any> {
    try {
      const userRepository = getRepository(User);
      const salt = bcrypt.genSaltSync(10);
      body.password = bcrypt.hashSync(body.password, salt);
      const token = await UserService.generateOTP();
      body.token = token
      const user = await userRepository.save(body);

      events.emit('register', body.email, token);
      user.password = '';
      return {
        status: 'SUCCESS',
        message: `Verification token has been sent to ${body.email}.`,
        data: {
          ...user
        }
      };
    } catch (error) {
      return {
        status: 'FAILED',
        message: 'Registration Failed',
        data: {}
      };
    }
  }

  public static async verifyEmail(body: verifyEmail): Promise<any> {
    try {
      const userRepository = getRepository(User);
      let user = await userRepository.findOne({ email: body.email })
      if (!user) {
        return {
          status: false,
          message: 'No user with this email',
          data: {}
        };
      } else if (user.token != body.token) {
        return {
          status: false,
          message: 'Invalid Token',
          data: {}
        };
      }
      user.emaillVerified = true;
      await userRepository.save(user);
      return {
        status: 'SUCCESS',
        message: 'Registration succesfull.',
        data: {
          ...user
        }
      };
    } catch (error) {
      return {
        status: false,
        message: error,
        data: {}
      };
    }
  }

  // login using username AND password AND get user details AND auth token
  public static async login(email: string, password: string) {
    return this.getUserAndAuthToken(email, password);
  }

  // // Gets user details AND auth token
  public static async getUserAndAuthToken(email: string, password: string) {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ email, emaillVerified: true });
      if (!user) {
        return {
          status: 'FAILURE',
          message: 'invalid credentials',
          data: {}
        };
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return {
          status: 'FAILURE',
          message: 'Invalid Password',
          data: {}
        };
      }
      const token = await UserService.createToken(user);
      user.password = '';
      return {
        status: 'SUCCESS',
        message: 'Login Successful',
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          gender: user.gender,
          age: user.dob,
          email: user.email,
          username: user.username,
          token
        }
      };
    } catch (error) {
      logger.error({
        message: `UserService.addUser() Error`,
        stack: error
      });
      return {
        status: 'FAILURE',
        message: 'error occured while processing your request',
        data: {}
      };
    }
  }
}

export default UserService;
