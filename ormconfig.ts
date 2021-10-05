import { ConnectionOptions } from 'typeorm';
import path from 'path';
import { dbObj } from './src/config';
const isCompiled = path.extname(__filename).includes('js');

export default {
  ...dbObj,
  entities: [`src/entities/**/*.${isCompiled ? 'js' : 'ts'}`],
  migrations: [`src/migration/**/*.${isCompiled ? 'js' : 'ts'}`],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration'
  }
} as ConnectionOptions;
