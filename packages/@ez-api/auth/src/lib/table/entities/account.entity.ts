import { Entity, Model, OneSchema, Table } from 'dynamodb-onetable';
import { fieldValidators } from '@ag-oss/one-table';
import { BasicRole } from '@ez-api/core';
import { withCommonAttributes } from '../common.schema';

/**
 * The name of the entity in the table
 */
export const AccountEntityName = 'Account' as const;

/**
 * The model schema for the entity, this will be merged into the table models schema.
 */
export const accountSchema = {
  ...withCommonAttributes({
    [AccountEntityName]: {
      email: {
        crypt: true,
        required: true,
        type: String,
        validate: fieldValidators.email,
      },
      gs1pk: { type: String, value: 'account#${email}' },
      gs1sk: { type: String, value: 'account#' },
      password: {
        crypt: true,
        required: true,
        type: String,
        validate: fieldValidators.password,
      },
      pk: { type: String, value: 'account#${id}' },
      role: {
        default: BasicRole.User,
        enum: Object.values(BasicRole),
        required: true,
        type: String,
      },
      sk: { type: String, value: 'account#' },
      verifiedEmail: { type: String },
    },
  } as const),
  // TODO RBAC
} as const;

/**
 * The type of the schema definition
 */
export type AccountSchema = typeof accountSchema.Account;

/**
 * The entity/data type
 */
export type IAccount = Entity<AccountSchema>;

/**
 * The model type
 */
export type AccountModel = Model<IAccount>;

/**
 * Utility for getting the model from the table.
 * Useful if you only have a reference to the table.
 * @param table
 */
export function getAccountModel<TableSchema extends OneSchema>(
  table: Table<TableSchema>,
): AccountModel {
  return table.getModel<IAccount>(AccountEntityName as never);
}
