import { config } from '../config';
import { createAuthHandler, EventParams, Handler } from '@ez-api/lambda';
import { BasicRole } from '@ez-api/core';

export function createAdminHandler<Params extends EventParams>(
  handler: Handler<Params, true>,
) {
  return createAuthHandler<Params>(handler, {
    allowedRoles: [BasicRole.Admin],
    authKey: config.jwt.accessKey,
  });
}
