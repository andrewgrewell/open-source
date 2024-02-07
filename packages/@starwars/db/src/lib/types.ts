import { starWarsSchema } from './schema';
import { accountSchema } from './schema/account.schema';
import { Entity, Model, Table } from 'dynamodb-onetable';
import { accountTokenSchema } from './schema/account-token.schema';
import { JwtService } from '@ag-oss/jwt';

export interface CreateTableOptions {
  client?: object;
  logger?: boolean;
}

export type StarWarsTable = Table<typeof starWarsSchema>;

export type IAccount = Entity<typeof accountSchema.Account>;
export type IAccountToken = Entity<typeof accountTokenSchema.AccountToken>;

export const TableName = 'StarWarsTable';

export enum TableModelName {
  Account = 'Account',
  AccountToken = 'AccountToken',
}
export interface TableModelsMap {
  table: StarWarsTable;
  [TableModelName.Account]: Model<IAccount>;
  [TableModelName.AccountToken]: Model<IAccountToken>;
}

export enum UserRoles {
  Admin = 'admin',
  User = 'user',
}

export interface AccessTokenPayload {
  [key: string]: unknown;
  sub: string;
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
