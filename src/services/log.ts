/**
 *        @file log_service.ts
 *  @repository
 * @application
 *     @summary LogService Class
 * @description Define Functions that perform CRUD operations on logs
 *   @functions - addLog()
 *              - viewLog()
 *              - viewAllLogs()
 */

import { Log } from '../entities/Log';
import { CommonService } from './common_service';

export class LogService extends CommonService {
  public _person_type!: string;

  constructor(_user: any) {
    super(_user);
  }

  public async addLog(log: Log) {}

  public async viewLog(log: Log) {}

  public async viewAllLogs(_log: Log) {}
}

export default LogService;
