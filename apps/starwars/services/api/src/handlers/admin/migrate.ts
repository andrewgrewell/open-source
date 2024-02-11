import { httpErrorResponse, httpSuccessResponse, BodyParams } from '@ez-api/lambda';
import { createAdminHandler } from '../../utils/create-admin-handler';
import { applyMigrations } from '@starwars/db';
import { createLocalClient } from '@ez-api/dynamodb';

// TODO support passing migration version or up/down
type Params = BodyParams<{ apply: boolean; createTable: boolean }>;

export const handler = createAdminHandler<Params>(async (event) => {
  const { apply, createTable } = event.body;
  try {
    const migrationsApplied = await applyMigrations({
      apply,
      client: createLocalClient(),
      createTable,
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
