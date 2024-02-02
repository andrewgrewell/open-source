import { MigrationConfig, MigrationsControllerConfig } from '../types';
import { oneTableCrypto } from '../utils/crypto';
import { convertMigrationsMapToConfigArray } from './convert-migrations-map-to-config-array';
import { createMigrateInstance } from './create-migrate-instance';
import { verboseLogger as log } from '@ag-oss/logging';
import { compareVersions } from 'compare-versions';
import { Migrate } from 'onetable-migrate';

export class MigrationsController<TableType> {
  private readonly migrations: MigrationConfig<TableType>[];
  private readonly oneTableParams: Record<string, unknown>;

  constructor(config: MigrationsControllerConfig<TableType> & { client: object }) {
    const { migrations, tableName, client } = config;
    this.oneTableParams = {
      client: client,
      crypto: oneTableCrypto,
      name: tableName,
      partial: true,
    };
    this.migrations = convertMigrationsMapToConfigArray(migrations);
  }

  async downgrade(targetVersion?: string, apply?: boolean) {
    // if no targetVersion than roll back one version
    const migrate = await createMigrateInstance(
      this.migrations,
      this.oneTableParams,
      apply,
    );
    if (!targetVersion) {
      const currentVersion = await this.getCurrentVersion();
      const previousMigration = this.migrations.find(
        (m) => compareVersions(m.version, currentVersion) === -1,
      );
      if (!previousMigration) {
        throw new Error(
          `No previous migration found before targetVersion: ${currentVersion}`,
        );
      }
      targetVersion = previousMigration.version;
    }
    log.verbose('Downgrading to migration: ', targetVersion);
    await migrate.apply(-1, targetVersion, { dry: !apply });
  }

  async getCurrentVersion(migrate?: Migrate) {
    // return the next version after the current version
    migrate =
      migrate ?? (await createMigrateInstance(this.migrations, this.oneTableParams));
    return await migrate.getCurrentVersion();
  }

  async getAppliedMigrations(migrate?: Migrate) {
    migrate =
      migrate ?? (await createMigrateInstance(this.migrations, this.oneTableParams));
    return await migrate.findPastMigrations();
  }

  async getOutstandingMigrations(migrate?: Migrate) {
    migrate =
      migrate ?? (await createMigrateInstance(this.migrations, this.oneTableParams));
    return await migrate.getOutstandingMigrations();
  }

  async setVersion(targetVersion: string, apply?: boolean) {
    // upgrade or downgrade to get to targetVersion
    const migrate = await createMigrateInstance(
      this.migrations,
      this.oneTableParams,
      apply,
    );
    const latestVersion = await this.getCurrentVersion();
    const direction = compareVersions(targetVersion, latestVersion);
    log.verbose('Setting version to migration: ', targetVersion);
    await migrate.apply(direction, targetVersion, { dry: !apply });
  }

  async upgrade(targetVersion?: string, apply?: boolean) {
    // if no targetVersion than upgrade one version
    const migrate = await createMigrateInstance(
      this.migrations,
      this.oneTableParams,
      apply,
    );
    if (!targetVersion) {
      const currentVersion = await this.getCurrentVersion();
      const nextMigration = this.migrations.find(
        (m) => compareVersions(m.version, currentVersion) === 1,
      );
      if (!nextMigration) {
        throw new Error(`No next migration found after targetVersion: ${targetVersion}`);
      }
      targetVersion = nextMigration.version;
    }
    log.verbose('Upgrading to migration: ', targetVersion);
    await migrate.apply(1, targetVersion, { dry: !apply });
  }

  async applyLatest(apply?: boolean) {
    const migrate = await createMigrateInstance(
      this.migrations,
      this.oneTableParams,
      apply,
    );
    const outstandingMigrations = await this.getOutstandingMigrations(migrate);
    log.verbose('outstandingMigrations', outstandingMigrations);
    for (const migration of outstandingMigrations) {
      await migrate.apply(1, migration.version, { dry: !apply });
    }
  }
}
