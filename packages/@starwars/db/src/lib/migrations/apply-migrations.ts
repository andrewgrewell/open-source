import {
  applyMigrations as _applyMigrations,
  ApplyMigrationsOptions,
} from '@ez-api/dynamodb';
import { starWarsMigrationsConfig } from './migrations.config';
import { starWarsTableSchema, tableName } from '../table';

export function applyMigrations(
  options: Omit<ApplyMigrationsOptions, 'migrationConfig'>,
) {
  return _applyMigrations({
    ...options,
    migrationConfig: {
      migrations: starWarsMigrationsConfig.migrations,
      schema: starWarsTableSchema,
      tableName,
    },
  });
}
