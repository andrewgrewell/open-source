import { createHandler, EventParams, Handler } from '@ez-api/lambda';

export function createPublicHandler<Params extends EventParams>(
  handler: Handler<Params, false>,
) {
  return createHandler<Params>(handler);
}
