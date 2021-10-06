/**
 *        @file common_service.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary CommonService Class
 * @description Defines common functions that can be used across all services
 *   @functions - getRows()
 */

import { User } from '../entities/User';

export class CommonService {
  public type_name!: string;

  public type_obj: any;

  public user_current: User;

  constructor(_user: any) {
    this.user_current = _user;
  }

}

export default CommonService;
