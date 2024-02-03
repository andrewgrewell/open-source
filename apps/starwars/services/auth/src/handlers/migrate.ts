import {
  BodyParams,
  createProtectedHandler,
  httpError,
  httpResponse,
} from '@ag-oss/serverless';
import { createLocalClientConfig } from '@ag-oss/dynamodb';
import { runMigrations } from '@ag-oss/one-table';
import { starWarsTableDef } from '@starwars/db';

// TODO support passing migration version or up/down
type Params = BodyParams<{ apply: boolean; createTable: boolean }>;

export const handler = createProtectedHandler<Params>(async (event, context) => {
  const { apply, createTable } = event.body;
  try {
    const clientConfig = createLocalClientConfig(8000);
    const migrationsApplied = await runMigrations({
      apply,
      clientConfig,
      createTable,
      migrationConfig: {
        migrations: starWarsTableDef.migrations,
        schema: starWarsTableDef.schema,
        tableName: starWarsTableDef.name,
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
});
