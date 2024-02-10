import { fieldValidators } from '@ag-oss/one-table';
import { asAccountItem } from '../common.schema';
import { Entity, Model, OneSchema, Table } from 'dynamodb-onetable';

/**
 * The name of the entity in the table
 */
export const AccountTokenEntityName = 'AccountToken' as const;

/**
 * The model schema for the entity, this will be merged into the table models schema.
 */
export const accountTokenSchema = asAccountItem({
  [AccountTokenEntityName]: {
    email: {
      crypt: true,
      required: true,
      type: String,
      validate: fieldValidators.email,
    },
    sk: { type: String, value: 'token#${email}' },
    token: {
      crypt: true,
      required: true,
      type: String,
    },
  },
} as const);

/**
 * The type of the schema definition
 */
export type AccountTokenSchema = typeof accountTokenSchema.AccountToken;

/**
 * The entity/data type
 */
export type IAccountToken = Entity<AccountTokenSchema>;

/**
 * The model type
 */
export type AccountTokenModel = Model<IAccountToken>;

/**
 * Utility for getting the model from the table.
 * Useful if you only have a reference to the table.
 * @param table
 */
export function getAccountTokenModel<TableSchema extends OneSchema>(
  table: Table<TableSchema>,
): AccountTokenModel {
  return table.getModel<IAccountToken>(AccountTokenEntityName as never);
}
