import {
  BodyParams,
  createProtectedHandler,
  httpError,
  httpResponse,
} from '@ag-oss/serverless';
import { createLocalClientConfig } from '@ag-oss/dynamodb';
import { runMigrations } from '@ag-oss/one-table';
import { starWarsTableDefLocal } from '@starwars/db';
import { config } from '../../config';

// TODO support passing migration version or up/down
type Params = BodyParams<{ apply: boolean; createTable: boolean }>;

// TODO: createAdminHandler which requires admin role claim
export const handler = createProtectedHandler<Params>(
  async (event) => {
    const { apply, createTable } = event.body;
    try {
      const clientConfig = createLocalClientConfig(8000);
      const migrationsApplied = await runMigrations({
        apply,
        clientConfig,
        createTable,
        migrationConfig: {
          migrations: starWarsTableDefLocal.migrations,
          schema: starWarsTableDefLocal.schema,
          tableName: starWarsTableDefLocal.name,
        },
      });
      return httpResponse({
        userMessage: apply
          ? `Migrations complete. Applied ${migrationsApplied} migrations`
          : 'Migrations complete (dry run). See logs for details',
      });
    } catch (e) {
      return httpError((e as Error) || new Error('Failed to run migrations'));
    }
  },
  { secret: config.jwt.adminKey },
);
