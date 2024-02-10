import { MigrationConfig } from '../types';
import { Migrate } from 'onetable-migrate';

export async function createMigrateInstance(
  migrations: MigrationConfig[],
  params: Record<string, unknown>,
  apply?: boolean,
) {
  const migrationParams = {
    dry: !apply,
    migrations: migrations,
  };
  const migrate = new Migrate(params, migrationParams);
  await migrate.init();
  return migrate;
}
