import { starWarsSchema } from './schema';
import { accountSchema } from './schema/account.schema';
import { Entity, Model, Table } from 'dynamodb-onetable';
import { accountTokenSchema } from './schema/account-token.schema';
import { JwtService } from '@ag-oss/jwt';
import { accountVerifyCodeSchema } from './schema/account-verify-code.schema';

export interface CreateTableOptions {
  client?: object;
  logger?: boolean;
}

export type StarWarsTable = Table<typeof starWarsSchema>;

export type IAccount = Entity<typeof accountSchema.Account>;
export type IAccountToken = Entity<typeof accountTokenSchema.AccountToken>;
export type IAccountVerifyCode = Entity<typeof accountVerifyCodeSchema.AccountVerifyCode>;

export const TableName = 'StarWarsTable';

export enum TableModelName {
  Account = 'Account',
  AccountToken = 'AccountToken',
  AccountVerifyCode = 'AccountVerifyCode',
}

export interface TableModelsMap {
  table: StarWarsTable;
  [TableModelName.Account]: Model<IAccount>;
  [TableModelName.AccountToken]: Model<IAccountToken>;
  [TableModelName.AccountVerifyCode]: Model<IAccountVerifyCode>;
}

export enum UserRoles {
  Admin = 'admin',
  User = 'user',
}

// TODO: add typing from what jsonwebtoken adds to the payload
export interface AccessTokenPayload {
  [key: string]: unknown;
  accountId: string;
  email: string;
}

export interface IdTokenPayload {
  [key: string]: unknown;
  accountId: string;
  email: string;
}

export interface RefreshTokenPayload {
  [key: string]: unknown;
  accountId: string;
  email: string;
}

export type StarWarsTokenService = JwtService<
  AccessTokenPayload,
  IdTokenPayload,
  RefreshTokenPayload
>;
