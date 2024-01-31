import { sign } from 'jsonwebtoken';

export interface CreateJwtOptions {
  id: string;
  secret: string;
  expiresIn: string;
}

export function createJwt(options: CreateJwtOptions) {
  const { id, secret, expiresIn } = options;
  return sign(
    {
      id,
    },
    secret,
    // TODO: populate these fields with actual data based on the request
    {
      audience: 'localhost',
      expiresIn,
      issuer: 'localhost',
      jwtid: id,
      subject: 'todo-user-id',
    },
  );
}
