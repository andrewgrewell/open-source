import { sign } from 'jsonwebtoken';
import { JwtAccessOptions } from '../types';

export async function createAccessToken(options: JwtAccessOptions) {
  const { key, expiresIn, payload } = options;
  return sign(
    {
      expiresIn: expiresIn || '15m',
      ...payload,
    },
    key,
  );
}
