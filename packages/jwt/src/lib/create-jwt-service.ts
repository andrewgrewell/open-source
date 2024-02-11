import { JwtService, JwtServiceConfig } from './types';
import {
  createAccessToken,
  createIdToken,
  createRefreshToken,
  getTokenSignProvider,
  getTokenVerifyProvider,
} from './utils';

export interface CreateJwtServiceOptions {
  jwt: JwtServiceConfig;
}

/**
 * Returns a service which makes it easier to manage JWT access/id/refresh tokens.
 * @param options
 */
export function createJwtService<
  TAccessPayload extends Record<string, unknown> = Record<string, unknown>,
  TIdPayload extends Record<string, unknown> = Record<string, unknown>,
  TRefreshPayload extends Record<string, unknown> = Record<string, unknown>,
>(
  options: CreateJwtServiceOptions,
): JwtService<TAccessPayload, TIdPayload, TRefreshPayload> {
  const { jwt } = options;
  return {
    access: {
      sign: getTokenSignProvider(createAccessToken, jwt.access),
      verify: getTokenVerifyProvider(jwt.access.key),
    },
    id: {
      sign: getTokenSignProvider(createIdToken, jwt.id),
      verify: getTokenVerifyProvider(jwt.id.key),
    },
    refresh: {
      sign: getTokenSignProvider(createRefreshToken, jwt.refresh),
      verify: getTokenVerifyProvider(jwt.refresh.key),
    },
  };
}
