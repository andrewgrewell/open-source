import { config } from '../config';
import {
  sendVerifyEmail as _sendVerifyEmail,
  SendVerifyEmailOptions,
} from '@ez-api/auth';
import { createMailgunTransporter } from '@ez-api/email';

const transporter = createMailgunTransporter({
  password: config.email.password,
  username: config.email.username,
});

export function sendVerifyEmail(
  options: Pick<SendVerifyEmailOptions, 'verifyCode' | 'email'>,
) {
  return _sendVerifyEmail({
    from: {
      address: config.email.username,
      name: 'StarWars App',
    },
    productName: 'StarWars App',
    transporter,
    ...options,
  });
}
