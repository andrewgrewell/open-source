import {
  CreateMigrationConfig,
  MigrationConfig,
  MigrationParams,
  MigrationImplContext,
  MigrationImplementation,
} from '../types';
import { createDryRunDb } from '../utils';
import { verboseLogger as log } from '@ag-oss/logging';
import { Table } from 'dynamodb-onetable';

/**
 * Creates a migration config which can be passed into OneTable MigrationController.
 * This provides a way to define a more flexible API than what OneTable provides.
 * @param config
 */
export function createMigration<TableType extends Table>(
  config: CreateMigrationConfig<TableType>,
): MigrationConfig {
  log.verbose('createMigration config: ', config);
  return {
    description: config.description,
    down(db, migrate, params) {
      if (!config.down) {
        // TODO support no down migration.
        //  this should be wrapping the modals in a proxy which calls the opposite
        //  of the methods called in the up runner.
        //  This would not be reliable but would work for most cases and be a good QoL feature.
      }
      return runMigration<TableType>(config.down, {
        Table: db as TableType,
        migrate,
        params,
      });
    },
    schema: config.schema,
    up(db, migrate, params) {
      return runMigration<TableType>(config.up, {
        Table: db as TableType,
        migrate,
        params,
      });
    },
    version: config.version,
  } as MigrationConfig;
}

function runMigration<TableType extends Table>(
  runner: MigrationImplementation<TableType>,
  context: Omit<MigrationImplContext<TableType>, 'dryLog'>,
) {
  const dryLog = createDryLog(context.params);
  const Table = context.params.dry ? createDryRunDb(context.Table) : context.Table;
  return runner({ ...context, Table, dryLog });
}

function createDryLog(params: MigrationParams) {
  return (message: string) => {
    if (params.dry) {
      console.log(message);
    }
  };
}
