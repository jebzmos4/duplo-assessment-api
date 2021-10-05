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
  public async send(
    to: string,
    subject: string,
    templateId: string,
    substitutions: any
  ) {
    return sendgrid.send({
      from: this.config.from,
      to,
      subject,
      templateId,
      substitutions
    });
  }
}

export default new EmailService();
