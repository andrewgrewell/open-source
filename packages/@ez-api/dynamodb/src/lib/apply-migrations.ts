import { runMigrations, RunMigrationsOptions } from '@ag-oss/one-table';

export type ApplyMigrationsOptions = RunMigrationsOptions;

export function applyMigrations(options: RunMigrationsOptions) {
  return runMigrations(options);
}
