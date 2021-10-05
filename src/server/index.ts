/**
 *        @file index.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary Starting point of the application
 * @description Handles the following middlwares:
 *              - CORS and Logger
 *              - Swagger
 *              - API routes
 *              - Auto Update Schema
 *              - Server
 */

import yaml from 'js-yaml';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import http from 'http';
import routes from '../routes';
import CORS from '../providers/cors';
import * as config from '../config';
import { notFoundHandler } from '../helpers';
import { logger, initRequest, logResponse } from '../providers/logger';
import SwaggerInit from '../swagger/init'; // Update impact_api.yaml

const main = (app: any, express: any): Promise<any> => {
  /**
   * HTTP and console logging middleware using winston package
   */
  return new Promise((resolve, reject) => {
    app.use(initRequest);
    app.use(logResponse);

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: '1.5MB' }));
    app.use(CORS.handle);

    // set token experiation and secret
    app.set('tokenSecret', config.server.apiUuid); // secret variable used for Jwt encoding
    app.set('tokenExpire', config.server.tokenExpiration);

    // set swagger
    (async () => {
      try {
        await SwaggerInit();
        const oas3Specification: any = yaml.load(
          fs.readFileSync('./swagger/backend_api.yaml', 'utf8')
        );
        app.use(
          '/swagger',
          swaggerUi.serve,
          swaggerUi.setup(oas3Specification)
        );
      } catch (error) {
        logger.error({
          message: `main(): Swagger error`,
          stack: error
        });
      }
    })();

    // set versions
    app.use('/v1', routes);
    app.use('*', notFoundHandler);

    // create server
    const server = http.createServer(app);
    const port = config.server.port || 5002;
    server.listen(port, () => resolve(server));
  });
};

export { main as startServer };
