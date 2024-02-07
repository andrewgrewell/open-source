import { OneSchema } from 'dynamodb-onetable';
import { accountSchema } from './account.schema';
import { accountTokenSchema } from './account-token.schema';

export const starWarsSchema: OneSchema = {
  indexes: {
    gs1: { hash: 'gs1pk', project: ['gs1pk', 'gs1sk'], sort: 'gs1sk' },
    primary: { hash: 'pk', sort: 'sk' },
  },
  models: {
    ...accountSchema,
    ...accountTokenSchema,
  } as const,
  params: {
    isoDates: true,
    timestamps: true,
  },
  version: '0.0.1',
} as const;
