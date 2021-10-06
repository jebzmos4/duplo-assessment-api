/* eslint-disable @typescript-eslint/ban-types */
/**
 *        @file index.ts
 *  @repository express-typescript-postgres
 * @application express-typescript-postgres
 *     @summary Server-specific configuration settings for the APIs.
 * @description This is an example of the config file which holds all the confidential credentials.
 */

interface dbClient {
  username: string;
  password: string | undefined;
  database: string;
  type: string;
  logging: boolean;
  host: string;
  port: number;
  // ssl: boolean;
  max: number;
  idleTimeoutMillis: number;
  pool: object;
  define: object;
  synchronize: boolean;
  autoReconnect: boolean;
  reconnectTries: number;
  reconnectInterval: number;
}

/**
 * @author Database Connection Profile (Primary)
 * PostgreSQL database connection profile (object), used to make a privilaged server-side (non-application)
 * connection to the InnVoyce database.
 */
export const dbObj: dbClient = {
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'jebzmos4',
  database: process.env.DATABASE_NAME || 'duplo',
  type: process.env.DATABASE_DIALECT || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  // ssl: Boolean(process.env.DATABASE_SSL) || false,
  max: Number(process.env.DATABASE_PORT) || 5432,
  idleTimeoutMillis: Number(process.env.DATABASE_IDLE_TIMEOUT_MILLIS),
  pool: {
    min: Number(process.env.DATABASE_MIN),
    max: Number(process.env.DATABASE_MAX),
    idle: Number(process.env.DATABASE_IDLE),
    acquire: Number(process.env.DATABASE_ACQUIRE)
  },
  define: {
    timestamps: JSON.parse(process.env.DATABASE_TIMESTAMPS || 'false')
  },
  logging: JSON.parse(process.env.DATABASE_LOGGING || 'false'),
  synchronize: JSON.parse(process.env.DATABASE_SYNCHRONIZE || 'false'),
  autoReconnect: JSON.parse(process.env.DATABASE_AUTO_RECONNECT || 'false'),
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: Number(process.env.DATABASE_RECONNECT_INTERVAL)
};

/**
 * @author Server Configuration
 * Configurable server object required by the API include settings for the server port (port), a UUID
 * used to encode the authorization token (apiUuid), and the duration of that token (tokenExpiration).
 */
export const server = {
  port: Number(process.env.PORT) || 9000,
  apiUuid: '0eb14adc-a16e-400c-8f55-7d6c016bb36d',
  hostname: process.env.HOSTNAME || '',
  tokenExpiration: {
    days: 1,
    hours: 8,
    minutes: 0,
    seconds: 0
  }
};

export const bcrypt = {
  saltRounds: 10
};

/**
 * @author Email Configuration
 */
export const email = {
  primary: {
    token: process.env.SENDGRID_API_KEY || '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',
    from: 'support@geekyants.com'
  },

  addresses: {
    support: 'support@geekyants.com'
  },
  intent: {
    welcome: ''
  }
};

/**
 * @author Generate a random password of your desired length.
 */
export const randomPasswordLength = 10;

/**
 * @author Customize your logs & don't let them occupy too much space.
 */
export const logs = {
  maxFiles: 5,
  maxFileSize: 20971520, // 20 MB
  zipOldLogs: true,
  fileName: 'duplo_backend'
};
