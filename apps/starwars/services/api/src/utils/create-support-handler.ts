import { config } from '../config';
import { createAuthHandler, EventParams, Handler } from '@ez-api/lambda';
import { BasicRole } from '@ez-api/core';

export function createSupportHandler<Params extends EventParams>(
  handler: Handler<Params, true>,
) {
  return createAuthHandler<Params>(handler, {
    allowedRoles: [BasicRole.Admin, BasicRole.Support],
    authKey: config.jwt.accessKey,
  });
}
