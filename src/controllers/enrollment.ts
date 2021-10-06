/**
 *        @file auth.ts
 *  @repository
 * @application
 *     @summary Authentication Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - UserService
 *   @functions - login()
 *              - register()
 *              - verifyEmail()
 *     @returns Express JSON Response
 */

import { EnrollmentService } from '../services';
import { Response, Request, NextFunction } from 'express';
import { ResponseWrapper } from '../helpers/response_wrapper';
import { User as UserModel } from '../entities/User';

interface AuthUserRequest extends Request {
    user: UserModel;
}

export class EnrollmentController {

  public static async list(
    req: AuthUserRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const result = await EnrollmentService.list(req.user);
    const response: ResponseWrapper = new ResponseWrapper(res);

    if (result.status) {
      return response.ok(result);
    }
    return response.unprocessableEntity(result);
  }

  public static async create(
    req: AuthUserRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.created(await EnrollmentService.create(req.body, req.user));
  }

  public static async delete(
    req: AuthUserRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.created(await EnrollmentService.delete(req.query, req.user));
  }
}
