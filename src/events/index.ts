/**
 *        @file index.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary Event Class
 * @description Handles all the Application Events
 *      @events - user_logins
 *              - forgot_password
 *              - new_user
 */

import { EventEmitter } from 'events';
import AuthListener from './listeners/auth.listener';

class Event extends EventEmitter {}

const events = new Event();
const authListeners = new AuthListener({});

// Listen to whenever some one hits LogIn
events.on(
  'register',
  async (email: string, token: string) => (
    authListeners.register(email, token)
  )
);

export default events;
