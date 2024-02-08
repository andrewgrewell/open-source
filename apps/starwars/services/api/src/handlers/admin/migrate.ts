import { createLocalClientConfig } from '@ag-oss/dynamodb';
import { runMigrations } from '@ag-oss/one-table';
import { starWarsTableDefLocal } from '@starwars/db';
import { httpErrorResponse, httpSuccessResponse, BodyParams } from '@ez-api/lambda';
import { createAdminHandler } from '../../utils/create-admin-handler';

// TODO support passing migration version or up/down
type Params = BodyParams<{ apply: boolean; createTable: boolean }>;

export const handler = createAdminHandler<Params>(async (event) => {
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
    return httpSuccessResponse({
      userMessage: apply
        ? `Migrations complete. Applied ${migrationsApplied} migrations`
        : 'Migrations complete (dry run). See logs for details',
    });
  } catch (e) {
    return httpErrorResponse((e as Error) || new Error('Failed to run migrations'));
  }
});
