/**
 *        @file app.ts
 *  @repository 016-n-3020_impact_api
 * @application 016-n-3020_impact_api
 *     @summary Authentication routes
 * @description Handles following routes:
 *              - POST '/login'
 *              - POST '/forgot-password'
 *              - POST '/change-password'
 *              - GET  '/whoami'
 *              - GET  '/refresh-token'
 */
import express from 'express';
import { wrapper } from '../../helpers';
import Schema from '../../middlewares/schema';
import AuthValidator from '../../validators/auth';
import { AuthController } from '../../controllers';
// import CheckAuth from '../../middlewares/check_auth';

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

// router.post(
//   '/login',
//   (req, res, next) => {
//     Schema.handle(req, res, next, AuthValidator.login());
//   },
//   wrapper(AuthController.login)
// );

// router.post(
//   '/forgot-password',
//   (req, res, next) => {
//     Schema.handle(req, res, next, AuthValidator.forgotPassword());
//   },
//   wrapper(AuthController.forgotPassword)
// );

// router.post(
//   '/change-password',
//   (req, res, next) => {
//     Schema.handle(req, res, next, AuthValidator.changePassword());
//   },
//   (req, res, next) => {
//     CheckAuth.check(req, res, next, '');
//   },
//   wrapper(AuthController.changePassword)
// );

// router.get(
//   // '/whoami',
//   // (req, res, next) => {
//   //   Schema.handle(req, res, next, AuthValidator.whoami());
//   // },
//   // (req, res, next) => {
//   //   CheckAuth.check(req, res, next, '*');
//   // },
//   // wrapper(AuthController.whoami)
// );

export default router;
