import { sign } from 'jsonwebtoken';
import { config } from '../../config';

export interface TokenProviderOptions {
  // TODO: take in an Account and use that to create the idToken (roles, metadata, etc)
  sub: string;
}

export function tokenProvider(options: TokenProviderOptions): {
  accessToken: string;
  refreshToken: string;
} {
  return {
    accessToken: createAccessToken(options),
    // TODO idToken: createIdToken(options),
    refreshToken: createRefreshToken(),
  };
}

export function createAccessToken({ sub }: TokenProviderOptions) {
  return sign(
    {
      expiresIn: '60d',
      subject: sub,
      ...(config.jwt.claims || {}),
    },
    config.jwt.accessKey,
  );
}

export function createRefreshToken() {
  return sign(
    {
      expiresIn: '60d',
    },
    config.jwt.refreshKey,
  );
}
