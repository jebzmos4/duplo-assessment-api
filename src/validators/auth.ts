/**
 *        @file auth.ts
 *  @repository
 * @application
 *     @summary AuthValidator Class
 * @description Defines validation structure for auth API requests
 */

import * as Joi from 'joi';

class AuthValidator {
  public register() {
    return Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      username: Joi.string().required(),
      dob: Joi.string().required(),
      gender: Joi.string().required(),
      password: Joi.string().required()
    });
  }

  public verify() {
    return Joi.object({
      email: Joi.string().required(),
      token: Joi.string().required()
    });
  }

  public login() {
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
