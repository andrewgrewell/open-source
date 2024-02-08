import { EventParams, Handler } from '../types';
import { authMiddleware, AuthMiddlewareOptions } from '../middleware';
import { createHandler } from './create-handler';

export function createAuthHandler<P extends EventParams>(
  handler: Handler<P>,
  options: AuthMiddlewareOptions,
) {
  return createHandler<P, true>(handler).use(authMiddleware(options));
}
