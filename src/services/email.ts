/**
 *        @file email_service.ts
 *  @repository 000-a-3100_api_boilerplate
 * @application 000-a-3100_api_boilerplate
 *     @summary EmailService Class
 * @description Defines function to send Email
 *   @functions - send()
 */
import { email } from '../config';

import { Client } from '@sendgrid/client';
import sendgrid = require('@sendgrid/mail');

interface EmailConfig {
  token: string;
  from: string;
}

export class EmailService {
  public config: EmailConfig = email.primary;

  constructor() {
    (async () => {
      sendgrid.setClient(new Client());

      // Test setApiKey() method
      sendgrid.setApiKey(this.config.token);

      // Test setSubstitutionWrappers() method
      sendgrid.setSubstitutionWrappers('{{', '}}');
    })();
  }

  public async sendText(
    to: string,
    subject: string, 
    token: string
  ) {
    const msg = {
      to,
      from: 'test@example.com', // Use the email address or domain you verified above
      subject,
      text: 'Please verify your email with this token',
      html: `<strong>This is your token ${token}</strong>`,
    };
    return sendgrid.send(msg);
  }
}

export default new EmailService();
