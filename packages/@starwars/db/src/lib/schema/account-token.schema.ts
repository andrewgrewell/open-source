import { asAccountItem } from './common.schema';
import { fieldValidators } from '@ag-oss/one-table';

export const accountTokenSchema = asAccountItem({
  AccountToken: {
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
