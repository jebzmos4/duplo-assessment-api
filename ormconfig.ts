import { ConnectionOptions } from 'typeorm';
import path from 'path';
import { dbObj } from './src/config';
const isCompiled = path.extname(__filename).includes('js');

export default {
  ...dbObj,
  //   type: dbObj.type,
  //   host: dbObj.host,
  //   port: dbObj.port,
  //   username: dbObj.username,
  //   password: dbObj.password,
  //   database: dbObj.database,
  //   synchronize: !dbObj.synchronize,
  //   logging: !dbObj.logging,
  //   autoReconnect: dbObj.autoReconnect,
  //   reconnectTries: dbObj.reconnectTries,
  //   reconnectInterval: dbObj.reconnectInterval,
  entities: [`src/entities/**/*.${isCompiled ? 'js' : 'ts'}`],
  migrations: [`src/migration/**/*.${isCompiled ? 'js' : 'ts'}`],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration'
  }
} as ConnectionOptions;
