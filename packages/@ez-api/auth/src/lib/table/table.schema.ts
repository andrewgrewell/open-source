import { createTableSchema, ProcedureDefinition, Table } from '@ez-api/dynamodb';
import {
  AccountEntityName,
  AccountModel,
  accountSchema,
  AccountTokenEntityName,
  accountTokenSchema,
  AccountTokenModel,
  AccountVerifyCodeEntityName,
  AccountVerifyCodeModel,
  accountVerifyCodeSchema,
} from './entities';

/**
 * This type defines the record of models which are available on the table.
 */
export type AuthModels = {
  [AccountEntityName]: AccountModel;
  [AccountTokenEntityName]: AccountTokenModel;
  [AccountVerifyCodeEntityName]: AccountVerifyCodeModel;
};

const authSchemaModels = {
  ...accountSchema,
  ...accountTokenSchema,
  ...accountVerifyCodeSchema,
} as const;

export type AuthSchemaModels = typeof authSchemaModels;

export const authTableSchema = createTableSchema({
  models: authSchemaModels,
  version: '0.0.1',
} as const);

export type AuthTableSchema = typeof authTableSchema;

// TODO: OneTable isn't typed very well so there is no way besides re-defining the type
//  to get proper type errors when accessing non-existent models.
export type AuthTable = Table<AuthTableSchema, AuthSchemaModels>;

export type AuthProcedureDefinition<
  TReturn,
  TOptions extends Record<string, unknown>,
> = ProcedureDefinition<AuthTable, AuthModels, TReturn, TOptions>;
