import { MigrationsConfigMap } from '../types';
import { createMigration } from './create-migration';
import { Table } from 'dynamodb-onetable';

export function convertMigrationsMapToConfigArray<T extends Table>(
  migrations: MigrationsConfigMap<T>,
) {
  return Object.entries(migrations).map(([version, config]) => {
    return createMigration({
      ...config,
      version,
    });
  });
}
