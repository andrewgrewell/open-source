import { fieldValidators } from '@ag-oss/one-table';
import { asAccountItem } from '../common.schema';
import { Entity, Model, OneSchema, Table } from 'dynamodb-onetable';

/**
 * The name of the entity in the table
 */
export const AccountVerifyCodeEntityName = 'AccountVerifyCode' as const;

/**
 * The model schema for the entity, this will be merged into the table models schema.
 */
export const accountVerifyCodeSchema = asAccountItem({
  [AccountVerifyCodeEntityName]: {
    code: {
      crypt: true,
      required: true,
      type: String,
    },
    email: {
      crypt: true,
      required: true,
      type: String,
      validate: fieldValidators.email,
    },
    sk: { type: String, value: 'verify-code#${email}' },
  },
} as const);

/**
 * The type of the schema definition
 */
export type AccountVerifyCodeSchema = typeof accountVerifyCodeSchema.AccountVerifyCode;

/**
 * The entity/data type
 */
export type IAccountVerifyCode = Entity<AccountVerifyCodeSchema>;

/**
 * The model type
 */
export type AccountVerifyCodeModel = Model<IAccountVerifyCode>;

/**
 * Utility for getting the model from the table.
 * Useful if you only have a reference to the table.
 * @param table
 */
export function getAccountVerifyCodeModel<TableSchema extends OneSchema>(
  table: Table<TableSchema>,
): AccountVerifyCodeModel {
  return table.getModel<IAccountVerifyCode>(AccountVerifyCodeEntityName as never);
}
