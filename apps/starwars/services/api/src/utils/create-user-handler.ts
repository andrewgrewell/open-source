import { config } from '../config';
import { createAuthHandler, EventParams, Handler } from '@ez-api/lambda';
import { EzApiBasicRole } from '@ez-api/core';

export function createUserHandler<Params extends EventParams>(
  handler: Handler<Params, true>,
) {
  return createAuthHandler<Params>(handler, {
    allowedRoles: [EzApiBasicRole.Admin, EzApiBasicRole.User],
    authKey: config.jwt.accessKey,
  });
}
