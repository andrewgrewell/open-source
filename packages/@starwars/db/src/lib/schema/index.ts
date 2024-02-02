import { orgSchema } from './org.schema';
import { userSchema } from './user.schema';
import { OneSchema } from 'dynamodb-onetable';

export const starWarsSchema: OneSchema = {
  indexes: {
    gs1: { hash: 'gs1pk', project: ['gs1pk', 'gs1sk'], sort: 'gs1sk' },
    primary: { hash: 'pk', sort: 'sk' },
  },
  models: {
    ...orgSchema,
    ...userSchema,
  } as const,
  params: {
    isoDates: true,
    timestamps: true,
  },
  version: '0.0.1',
} as const;
