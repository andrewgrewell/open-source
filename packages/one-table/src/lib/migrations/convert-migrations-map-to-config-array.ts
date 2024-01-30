import { MigrationsConfigMap } from '../types';
import { createMigration } from './create-migration';

export function convertMigrationsMapToConfigArray<T>(migrations: MigrationsConfigMap<T>) {
  return Object.entries(migrations).map(([version, config]) => {
    return createMigration({
      ...config,
      version,
    });
  });
}
