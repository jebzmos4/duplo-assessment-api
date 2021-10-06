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
import * as config from '../config';
import { User } from '../entities/User';
import { Enrollment } from '../entities/Enrollment';


import { CommonService } from '../services';
import { logger } from '../providers/logger';

export class EnrollmentService extends CommonService {
  expReq?: any;

  expRes?: any;

  constructor(_user: any) {
    super(_user);
  }

  public static verifyToken(bearer: string): Promise<any> {
    try {
      const token = jwt.verify(bearer, config.server.apiUuid);
      return Promise.resolve({ success: true, token });
    } catch (err) {
      return Promise.reject({ success: false, error: err });
    }
  }

  public static async create(body: any, user: any): Promise<any> {
    try {
      const enrollmentRepository = getRepository(Enrollment);
      body.user = user.id

      const enrollment = await enrollmentRepository.save(body);

      user.password = '';
      return {
        status: 'SUCCESS',
        message: 'Enrollment Successful',
        data: {
          ...enrollment
        }
      };
    } catch (error) {
        console.log(error)
      return {
        status: 'FAILED',
        message: 'Enrollment Failed',
        data: {}
      };
    }
  }

   public static async delete(query: any, user: any): Promise<any> {
    try {
        const enrollmentRepository = getRepository(Enrollment);
        let enrollment = await enrollmentRepository.findOne({ id: query.enrollment_id })
      if (!enrollment) {
        return {
          status: false,
          message: 'No enrollment with this id',
          data: {}
        };
      } 
      await enrollmentRepository.delete(query.enrollment_id);
      const data = await enrollmentRepository.find({ user: user.id });
      return {
        status: 'SUCCESS',
        message: 'Enrollment Deleted.',
        data: {
          ...data
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

  public static async list(user: any) {
    try {
      const enrollmentRepository = getRepository(Enrollment);
      const enrollment = await enrollmentRepository.find({ user: user.id });
      if (!enrollment) {
        return {
          status: 'FAILURE',
          message: 'invalid token',
          data: {}
        };
      }
      return {
        status: 'SUCCESS',
        message: 'Listing Successful',
        data: enrollment
      };
    } catch (error) {
        console.log(error)
      return {
        status: 'FAILURE',
        message: 'error occured while processing your request',
        data: {}
      };
    }
  }
}

export default EnrollmentService;
