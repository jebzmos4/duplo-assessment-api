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

import { email } from '../../config';
import { CommonService, EmailService } from '../../services';

export interface User {
  id: number;
}

export class AuthListener extends CommonService {
  public async userLogin(user: User, ip: string, hostname: string) {}

  public async forgotPassword(email: string, firstName: string) {
    const service = new EmailService();
  }

  public async register(email: string, token: string) {
    const service = new EmailService();
  }

  public async changePassword(email: string, firstName: string) {}

  public async resetPassword(email: string, firstName: string) {}
}

export default AuthListener;
