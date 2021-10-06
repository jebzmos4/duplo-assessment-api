/**
 *        @file app.ts
 *  @repository 016-n-3020_impact_api
 * @application 016-n-3020_impact_api
 *     @summary Authentication routes
 * @description Handles following routes:
 *              - GET '/list'
 *              - DELETE '/delete'
 *              - POST '/crete'
 */
import express from 'express';
import { wrapper } from '../../helpers';
import Schema from '../../middlewares/schema';
import AuthValidator from '../../validators/auth';
import { EnrollmentController } from '../../controllers';
import CheckAuth from '../../middlewares/auth';
const router = express.Router();

router.get(
  '/list',
  (req: any, res: any, next: any) => {
    CheckAuth.check(req, res, next, '');  },
  wrapper(EnrollmentController.list)
);

router.post(
  '/create',
  (req: any, res: any, next: any) => {
    CheckAuth.check(req, res, next, '');
  },
  wrapper(EnrollmentController.create)
);

router.delete(
  '/delete',
  (req, res, next) => {
    CheckAuth.check(req, res, next, '');  },
  wrapper(EnrollmentController.delete)
);

export default router;
