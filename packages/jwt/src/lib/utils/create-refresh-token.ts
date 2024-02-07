import { sign } from 'jsonwebtoken';
import { JwtRefreshOptions } from '../types';

export async function createRefreshToken(options: JwtRefreshOptions) {
  const { key, expiresIn, payload } = options;
  return sign(
    {
      expiresIn: expiresIn || '60d',
      ...payload,
    },
    key,
  );
}
