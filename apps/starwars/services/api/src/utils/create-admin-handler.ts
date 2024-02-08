import { config } from '../config';
import { createAuthHandler, EventParams, Handler } from '@ez-api/lambda';
import { EzApiBasicRole } from '@ez-api/core';

export function createAdminHandler<Params extends EventParams>(
  handler: Handler<Params, true>,
) {
  return createAuthHandler<Params>(handler, {
    allowedRoles: [EzApiBasicRole.Admin],
    authKey: config.jwt.accessKey,
  });
}
