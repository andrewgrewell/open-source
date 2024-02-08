import { config } from '../config';
import { createAuthHandler, EventParams, Handler } from '@ez-api/lambda';
import { EzApiBasicRole } from '@ez-api/core';

export function createSupportHandler<Params extends EventParams>(
  handler: Handler<Params, true>,
) {
  return createAuthHandler<Params>(handler, {
    allowedRoles: [EzApiBasicRole.Admin, EzApiBasicRole.Support],
    authKey: config.jwt.accessKey,
  });
}
