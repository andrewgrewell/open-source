import { sign } from 'jsonwebtoken';
import { JwtIdOptions } from '../types';

export async function createIdToken(options: JwtIdOptions) {
  const { key, expiresIn, payload } = options;
  return sign(
    {
      expiresIn: expiresIn || '60d',
      ...payload,
    },
    key,
  );
}
