import NodeMailer from 'nodemailer';
import { config } from '../config';
import { getVerifyEmailTemplate } from './verify-email.template';

const transporter = NodeMailer.createTransport({
  // Use Smtp Protocol to send Email
  auth: {
    pass: config.email.password,
    user: config.email.username,
  },
  service: 'MailGun',
});

export interface SendConfirmEmailOptions {
  passcode: string;
  email: string;
}

export async function sendVerifyEmail(options: SendConfirmEmailOptions) {
  const { passcode, email } = options;
  console.log('Sending email from domain: ', config.email.domain);
  const mailOpt = {
    from: {
      address: config.email.username,
      name: 'StarWars App',
    },
    html: getVerifyEmailTemplate({ passcode }),
    subject: 'Verify your email with StarWars App',
    text: 'Please confirm your email.',
    to: email,
  };
  await transporter.sendMail(mailOpt);
}
