/**
 *        @file auth.ts
 *  @repository
 * @application
 *     @summary Authentication Controller Class.
 * @description This file contains function(s) which call our respective service(s) to get the data
 *    @services - UserService
 *   @functions - login()
 *              - forgotPassword()
 *              - changePassword()
 *     @returns Express JSON Response
 */

import events from '../events';
import { UserService } from '../services';
import { Response, Request, NextFunction } from 'express';
import { ResponseWrapper } from '../helpers/response_wrapper';
import { AuthUserRequest } from '../typings/interface';

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
      events.emit('user_logins', result.data, req.ip, req.headers.host);
      return response.ok(result);
    }

    events.emit('login_attempt', req.ip, req.headers.host);
    return response.unprocessableEntity(result);
  }

  public static async forgotPassword(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const { email } = req.body;
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.ok(await UserService.forgotPassword(email));
  }

  public static async changePassword(
    req: AuthUserRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const objSysAdmin = req.user;
    const { oldPassword, newPassword } = req.body;

    const userService: UserService = new UserService(objSysAdmin);
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.ok(
      await userService.changePassword(
        objSysAdmin.email,
        oldPassword,
        newPassword
      )
    );
  }

  public static async register(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const response: ResponseWrapper = new ResponseWrapper(res);
    return response.created(await UserService.register(req.body));
  }
}
