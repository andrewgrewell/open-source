/* istanbul ignore file */
import { MigrationsConfigMap } from '../types';
import { createOneTable } from '../utils';
import { MigrationsController } from './migrations-controller';
import { OneSchema } from 'dynamodb-onetable';
import Dynamo from 'dynamodb-onetable/Dynamo';

export interface RunMigrationsOptions {
  client: Dynamo['client'];
  migrationConfig: {
    migrations: MigrationsConfigMap;
    tableName: string;
    schema: OneSchema;
  };
  apply?: boolean;
  createTable?: boolean;
}

export async function runMigrations(options: RunMigrationsOptions) {
  const { client, migrationConfig, apply, createTable } = options;
  console.log(`Running migrations`);
  const table = createOneTable({
    client,
    name: migrationConfig.tableName,
    schema: migrationConfig.schema,
  });
  if (!(await table.exists())) {
    if (createTable) {
      console.log(
        'Table ${migrationConfig.tableName} does not exist and createTable was true. Creating table',
      );
      await table.createTable();
      console.log(`Table ${migrationConfig.tableName} created`);
    } else {
      const errorMessage = `Table ${migrationConfig.tableName} does not exist and createTable was false, migration aborted`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
  const controller = new MigrationsController({
    client,
    migrations: migrationConfig.migrations,
    tableName: migrationConfig.tableName,
  });
  const migrationsApplied = await controller.applyLatest(apply);
  console.log(`Migrations complete applied ${migrationsApplied} migrations`);
  return migrationsApplied;
}
