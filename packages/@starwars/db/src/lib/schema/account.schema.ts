import { TableModelName } from '../types';
import { createStarWarsRbacSchema } from '../utils/create-star-wars-rbac-schema';
import { withCommonAttributes } from './common.schema';
import { fieldValidators } from '@ag-oss/one-table';

const accountSchemaDef = withCommonAttributes({
  Account: {
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
    sk: { type: String, value: 'account#' },
    verifiedEmail: { type: String },
  },
} as const);

export const AccountAccessSchema = {
  AccountAccess: createStarWarsRbacSchema(
    [TableModelName.Account],
    Object.keys(accountSchemaDef.Account),
  ),
};

export const accountSchema = {
  ...accountSchemaDef,
  ...AccountAccessSchema,
} as const;
