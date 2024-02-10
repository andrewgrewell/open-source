import { ProcedureDefinition, ProcedureExecutor } from '@ez-api/dynamodb';
import { AuthModels, AuthTable } from './table';
import { JwtService } from '@ag-oss/jwt';

export type AuthProcedureDefinition<
  TReturn,
  TOptions extends Record<string, unknown>,
> = ProcedureDefinition<AuthTable, AuthModels, TReturn, TOptions>;

export type AuthProcedureExecutor<
  TReturn,
  TOptions extends Record<string, unknown>,
> = ProcedureExecutor<AuthTable, AuthModels, TReturn, TOptions>;

export interface CommonTokenPayload {
  // TODO: add typing from what jsonwebtoken adds to the payload
  [key: string]: unknown;
  accountId: string;
  email: string;
}

export interface AccessTokenPayload extends CommonTokenPayload {}

export interface IdTokenPayload extends CommonTokenPayload {}

export interface RefreshTokenPayload extends CommonTokenPayload {}

// TODO support consumers extending this type with their own token payload types
export type AuthTokenService = JwtService<
  AccessTokenPayload,
  IdTokenPayload,
  RefreshTokenPayload
>;
