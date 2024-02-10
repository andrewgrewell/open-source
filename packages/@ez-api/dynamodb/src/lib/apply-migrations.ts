import { runMigrations, RunMigrationsOptions } from '@ag-oss/one-table';
import { Table } from './types';

export type ApplyMigrationsOptions<TTable extends Table<any>> =
  RunMigrationsOptions<TTable>;

export function applyMigrations<TTable extends Table<any>>(
  options: RunMigrationsOptions<TTable>,
) {
  return runMigrations(options);
}
