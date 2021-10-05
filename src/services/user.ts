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
import {
  TokenBody,
  forgotPassword,
  createToken,
  changePassword,
  registrationObj
} from '../typings/interface';

import messages from '../constants';

export class UserService extends CommonService {
  expReq?: any;

  expRes?: any;

  salt: number;

  constructor(_user: any) {
    super(_user);
    this.salt = 10;
  }

  public static async createToken(user: User): Promise<createToken> {
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

  public static verifyToken(bearer: string): Promise<TokenBody> {
    try {
      const token = jwt.verify(bearer, config.server.apiUuid);
      return Promise.resolve({ success: true, token });
    } catch (err) {
      return Promise.reject({ success: false, error: err });
    }
  }

  public static async register(body: registrationObj): Promise<any> {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.save(body);

      const token = await UserService.createToken(user);
      user.password = '';
      return {
        status: true,
        message: messages.success.user.login,
        data: {
          ...user,
          ...token
        }
      };
    } catch (error) {
      return {
        status: false,
        message: messages.errors.user.login,
        data: {}
      };
    }
  }

  // login using username AND password AND get user details AND auth token
  public static async login(email: string, password: string) {
    return this.getUserAndAuthToken(email, password);
  }

  // Gets user details AND auth token
  public static async getUserAndAuthToken(email: string, password: string) {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ email, isActive: true });
      if (!user) {
        return {
          status: false,
          message: messages.errors.user.login,
          data: {}
        };
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return {
          status: false,
          message: messages.errors.user.login,
          data: {}
        };
      }
      const token = await UserService.createToken(user);
      user.password = '';
      return {
        status: true,
        message: messages.success.user.login,
        data: {
          ...user,
          ...token
        }
      };
    } catch (error) {
      logger.error({
        message: `UserService.addUser() Error`,
        stack: error
      });
      return {
        status: false,
        message: messages.errors.user.login,
        data: {}
      };
    }
  }

  /**
   * @author forgot password
   * @param email
   * @returns interface {forgotPassword}
   */
  public static async forgotPassword(email: string): Promise<forgotPassword> {
    const response = {
      status: true,
      message: messages.success.user.passwordReset,
      data: {}
    };
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ email, isActive: true });
      if (!user) {
        return response;
      }
      // Emitting event that "forgot password" has ran statusfully
      events.emit('forgot_password', email, email);
      return response;
    } catch (error) {
      return {
        status: false,
        data: {},
        message: messages.errors.user.login
      };
    }
  }

  /**
   * @author Changes password for given user after verifying old password is matching current password
   * @param email
   * @param oldPassword
   * @param newPassword
   * @returns
   */
  public async changePassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Promise<changePassword> {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ email, isActive: true });
      if (!user) {
        return {
          status: true,
          message: messages.errors.user.password,
          data: {}
        };
      }

      if (!bcrypt.compareSync(oldPassword, user.password)) {
        return {
          status: true,
          message: messages.errors.user.password,
          data: {}
        };
      }

      const salt = bcrypt.genSaltSync(this.salt);
      user.password = bcrypt.hashSync(newPassword, salt);
      await userRepository.save(user);
      // Emitting event that "forgot password" has ran statusfully
      events.emit('change_password', email);
      return {
        status: true,
        message: messages.success.user.password,
        data: {}
      };
    } catch (error) {
      return {
        status: false,
        message: messages.errors.user.login,
        data: {}
      };
    }
  }

  public getDefaultUser(reset?: boolean) {
    if (
      reset ||
      !this.user_current ||
      !this.user_current.id ||
      !this.user_current.email
    ) {
      this.user_current = new User();
    }

    return this.user_current;
  }
}

export default UserService;
