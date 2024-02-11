import { JwtService } from '@ag-oss/jwt';

export enum UserRoles {
  Admin = 'admin',
  User = 'user',
}

export interface CommonTokenPayload {
  // TODO: add typing from what jsonwebtoken adds to the payload
  [key: string]: unknown;
  accountId: string;
  email: string;
}

export interface AccessTokenPayload extends CommonTokenPayload {}

export interface IdTokenPayload extends CommonTokenPayload {}

export interface RefreshTokenPayload extends CommonTokenPayload {}

export type StarWarsTokenService = JwtService<
  AccessTokenPayload,
  IdTokenPayload,
  RefreshTokenPayload
>;
