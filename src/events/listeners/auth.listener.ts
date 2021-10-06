/* eslint-disable @typescript-eslint/no-empty-function */
/**
 *        @file auth_listener.ts
 *  @repository
 * @application
 *     @summary AuthListener Class
 * @description Contains functions for the application events listed in Event @class
 *   @functions - userLogin
 *              - forgotPassword
 *              - newUser
 *              - changePassword
 *     @returns Email Template for a particular event fired
 */

 import { CommonService, EmailService } from '../../services';

export interface User {
  id: number;
}

export class AuthListener extends CommonService {
  public async register(email: string, token: string) {
    const service = new EmailService();
    service.sendText(email, 'verify Email from Duplo', token)
  }
}

export default AuthListener;
