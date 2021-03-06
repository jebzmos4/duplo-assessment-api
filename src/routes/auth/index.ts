/**
 *        @file app.ts
 *  @repository 016-n-3020_impact_api
 * @application 016-n-3020_impact_api
 *     @summary Authentication routes
 * @description Handles following routes:
 *              - POST '/login'
 *              - POST '/signup'
 *              - POST '/verify-email'
 */
import express from 'express';
import { wrapper } from '../../helpers';
import Schema from '../../middlewares/schema';
import AuthValidator from '../../validators/auth';
import { AuthController } from '../../controllers';

const router = express.Router();

router.post(
  '/signup',
  (req: any, res: any, next: any) => {
    Schema.handle(req, res, next, AuthValidator.register());
  },
  wrapper(AuthController.register)
);

router.post(
  '/verify-email',
  (req: any, res: any, next: any) => {
    Schema.handle(req, res, next, AuthValidator.verify());
  },
  wrapper(AuthController.verifyEmail)
);

router.post(
  '/login',
  (req, res, next) => {
    Schema.handle(req, res, next, AuthValidator.login());
  },
  wrapper(AuthController.login)
);

export default router;
