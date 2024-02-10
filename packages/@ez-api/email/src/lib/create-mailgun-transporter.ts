import { MailTransporter } from './types';
import NodeMailer from 'nodemailer';

export interface CreateMailgunTransportOptions {
  password: string;
  username: string;
}

export function createMailgunTransporter(
  options: CreateMailgunTransportOptions,
): MailTransporter {
  const { password, username } = options;
  return NodeMailer.createTransport({
    auth: {
      pass: password,
      user: username,
    },
    service: 'MailGun',
  });
}
