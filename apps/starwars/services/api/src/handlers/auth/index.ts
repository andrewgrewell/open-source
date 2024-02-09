import { handler as createAccountHandler } from './create-account';
import { handler as getAccountHandler } from './get-account';
import { handler as refreshTokenHandler } from './refresh-token';
import { handler as signInHandler } from './sign-in';
import { handler as verifyEmailHandler } from './verify-email';
import { createRouter, RouterRoute } from '@ez-api/lambda';

export const basePath = '/auth';

export const routes: RouterRoute[] = [
  {
    handler: createAccountHandler,
    method: 'POST',
    path: 'account',
  },
  {
    handler: getAccountHandler,
    method: 'GET',
    path: 'account',
  },
  {
    handler: refreshTokenHandler,
    method: 'POST',
    path: 'refresh-token',
  },
  {
    handler: signInHandler,
    method: 'POST',
    path: 'sign-in',
  },
  {
    handler: verifyEmailHandler,
    method: 'POST',
    path: 'verify-email',
  },
];

export const handler = createRouter({ basePath, routes });
