/* istanbul ignore file */
import { MigrationsConfigMap } from '../types';
import { createOneTable } from '../utils';
import { MigrationsController } from './migrations-controller';
import { createDynamodbClient, CreateDynamodbClientConfig } from '@ag-oss/dynamodb';
import { verboseLogger as log } from '@ag-oss/logging';
import { withPrettyOutput } from '@ag-oss/console-ui';
import { OneSchema } from 'dynamodb-onetable';
import prompts from 'prompts';

export interface RunMigrationsOptions<TableType> {
  client?: object;
  clientConfig: CreateDynamodbClientConfig;
  migrationConfig: {
    migrations: MigrationsConfigMap<TableType>;
    tableName: string;
    schema: OneSchema;
  };
  apply?: boolean;
}

export async function runMigrations<TableType>(options: RunMigrationsOptions<TableType>) {
  await withPrettyOutput(async ({ spinner }) => {
    try {
      const { client: optionsClient, clientConfig, migrationConfig, apply } = options;
      spinner.start(`Running migrations`);
      const client = optionsClient ?? createDynamodbClient(clientConfig);
      const table = createOneTable({
        client,
        name: migrationConfig.tableName,
        schema: migrationConfig.schema,
      });
      if (!(await table.exists())) {
        spinner.fail(`Table ${migrationConfig.tableName} does not exist`);
        const { create } = await prompts({
          initial: true,
          message: `Would you like to create table ${migrationConfig.tableName}?`,
          name: 'create',
          type: 'confirm',
        });
        if (!create) {
          return;
        }
        spinner.start('Creating table');
        await table.createTable();
        spinner.succeed(`Table ${migrationConfig.tableName} created`);
      }
      const controller = new MigrationsController({
        client,
        migrations: migrationConfig.migrations,
        tableName: migrationConfig.tableName,
      });
      await controller.applyLatest(apply);
      spinner.succeed('Migrations complete');
    } catch (e) {
      spinner.fail((e as Error)?.message || 'Failed to run migrations');
      log.verbose(e);
      return;
    }
  });
}
