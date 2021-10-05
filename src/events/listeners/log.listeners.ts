/* eslint-disable @typescript-eslint/no-empty-function */
/**
 *        @file auth_listener.ts
 *  @repository
 * @application
 *     @summary AuthListener Class
 * @description Contains functions for the application events listed in Event @class
 *   @functions - writeAuditLog
 *     @returns Email Template for a particular event fired
 */

import { CommonService } from '../../services';

export class LogListener extends CommonService {
  public async writeAuditLog(email: string, ip: string, hostname: string) {
    this.saveAuditLog(email, ip);
  }
}

export default LogListener;
