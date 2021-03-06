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

import { UserService } from '../services';
import { Response, Request, NextFunction } from 'express';
import { ResponseWrapper } from '../helpers/response_wrapper';

export class AuthController {

  public static async login(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);
    const response: ResponseWrapper = new ResponseWrapper(res);

    if (result.status) {
      return response.ok(result);
    }
    return response.unprocessableEntity(result);
  }

  public static async register(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.created(await UserService.register(req.body));
  }

  public static async verifyEmail(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.created(await UserService.verifyEmail(req.body));
  }
}
