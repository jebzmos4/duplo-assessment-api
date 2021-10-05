/**
 *        @file auth.ts
 *  @repository
 * @application
 *     @summary AuthValidator Class
 * @description Defines validation structure for auth API requests
 */

import * as Joi from 'joi';

class AuthValidator {
  public login() {
    return Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required()
    });
  }

  public addAdmin() {
    return Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required()
    });
  }

  public forgotPassword() {
    return Joi.object({
      email: Joi.string().required()
    });
  }

  public changePassword() {
    return Joi.object({
      email: Joi.string().required(),
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required()
    });
  }

  public whoami() {
    return Joi.object({});
  }
}

export default new AuthValidator();
