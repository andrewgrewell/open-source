import {
  applyMigrations as _applyMigrations,
  ApplyMigrationsOptions,
  Table,
} from '@ez-api/dynamodb';

export function applyMigrations<TTable extends Table<any>>(
  options: ApplyMigrationsOptions<TTable>,
) {
  return _applyMigrations(options);
}
