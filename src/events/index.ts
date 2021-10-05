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
import AuthListener, { User } from './listeners/auth.listener';
import LogListener from './listeners/log.listeners';

class Event extends EventEmitter {}

const events = new Event();
const authListeners = new AuthListener({});
const logListeners = new LogListener({});

// Listen to whenever some one hits LogIn
events.on(
  'user_logins',
  async (user: User, ip: string, hostname: string) => (
    authListeners.userLogin(user, ip, hostname),
    logListeners.saveAuditLog(ip, ip)
  )
);

// Listen to success forgot password events
events.on('forgot_password', async (email: string, firstName: string) =>
  authListeners.forgotPassword(email, firstName)
);

// Listens to newly created user events
events.on('new_user', async (email: string, firstName: string) =>
  authListeners.register(email, firstName)
);

events.on('change_password', async (email: string, firstName: string) =>
  authListeners.changePassword(email, firstName)
);

events.on('reset_password', async (email: string, firstName: string) =>
  authListeners.resetPassword(email, firstName)
);

export default events;
