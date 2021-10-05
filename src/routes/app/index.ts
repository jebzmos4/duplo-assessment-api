/**
 *        @file app.ts
 *  @repository 016-n-3020_impact_api
 * @application 016-n-3020_impact_api
 *     @summary Application routes
 * @description Handles following routes:
 *              - GET '/version'
 */
import express from 'express';

import { wrapper } from '../../helpers';
import { AppController } from '../../controllers';

const router = express.Router();

/**
 * @openapi
 * /v1/app/:
 *  get:
 *    tags:
 *    - App
 *    summary: Get API Version
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  $ref: '#/components/schemas/version'
 */
router.get('/', wrapper(AppController.base));

export default router;
