import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { EventParams, Handler } from './types';
import { authMiddleware } from './middleware';

export function createHandler<P extends EventParams, isProtected extends boolean = false>(
  handler: Handler<P, isProtected>,
) {
  return middy(handler).use(middyJsonBodyParser({ disableContentTypeError: true }));
}

export interface ProtectedHandlerOptions {
  secret?: string;
}

export function createProtectedHandler<P extends EventParams>(
  handler: Handler<P>,
  options?: ProtectedHandlerOptions,
) {
  return createHandler<P, true>(handler).use(authMiddleware(options));
}
