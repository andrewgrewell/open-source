import { starWarsMigrationsConfig } from './migrations';
import { starWarsSchema } from './schema';
import { createLocalClientConfig } from '@ag-oss/dynamodb';

export const starWarsTableDef = {
  clientConfig: createLocalClientConfig(),
  migrations: starWarsMigrationsConfig.migrations,
  name: starWarsMigrationsConfig.tableName,
  schema: starWarsSchema,
};
