import { starWarsSchema } from './schema';
import { orgSchema } from './schema/org.schema';
import { userSchema } from './schema/user.schema';
import { Entity, Model, Table } from 'dynamodb-onetable';

export interface CreateTableOptions {
  client?: object;
  logger?: boolean;
}

export type StarWarsTable = Table<typeof starWarsSchema>;

export type IOrg = Entity<typeof orgSchema.Org>;
export type IUser = Entity<typeof userSchema.User>;

export const TableName = 'StarWarsTable';

export enum TableModelName {
  Org = 'Org',
  User = 'User',
}
export interface TableModelsMap {
  table: StarWarsTable;
  [TableModelName.Org]: Model<IOrg>;
  [TableModelName.User]: Model<IUser>;
}

export enum UserRoles {
  InternalAdmin = 'internalAdmin',
  InternalSupport = 'internalSupport',
  OrgOwner = 'orgAdmin',
  OrgAdmin = 'orgSupport',
  OrgMember = 'orgMember',
}
