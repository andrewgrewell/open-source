import { config } from '../config';
import { createJwtService } from '@ag-oss/jwt';
import {
  BasicRole,
  AccessTokenPayload,
  IdTokenPayload,
  RefreshTokenPayload,
} from '@ez-api/auth';

export const tokenService = createJwtService<
  AccessTokenPayload,
  IdTokenPayload,
  RefreshTokenPayload
>({
  jwt: {
    access: {
      expiresIn: '1hr',
      key: config.jwt.accessKey,
      payload: {
        roles: [BasicRole.User],
      },
    },
    id: {
      expiresIn: '60d',
      key: config.jwt.idKey,
    },
    refresh: {
      expiresIn: '60d',
      key: config.jwt.refreshKey,
    },
  },
});
