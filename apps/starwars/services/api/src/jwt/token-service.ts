import { config } from '../config';
import { createJwtService } from '@ag-oss/jwt';
import { AccessTokenPayload, IdTokenPayload, RefreshTokenPayload } from '@starwars/db';
import { EzApiBasicRole } from '@ez-api/core';

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
        roles: [EzApiBasicRole.User],
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
