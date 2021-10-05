/**
 *        @file common_service.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary CommonService Class
 * @description Defines common functions that can be used across all services
 *   @functions - getRows()
 */
import { getRepository } from 'typeorm';

import { User } from '../entities/User';
import { Log } from '../entities/Log';

export class CommonService {
  public type_name!: string;

  public type_obj: any;

  public user_current: User;

  constructor(_user: any) {
    this.user_current = _user;
  }

   public async saveAuditLog(email: string, password: string) {}

}

export default CommonService;
