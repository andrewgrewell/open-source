import { asAccountItem } from './common.schema';
import { fieldValidators } from '@ag-oss/one-table';

export const accountVerifyCodeSchema = asAccountItem({
  AccountVerifyCode: {
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
