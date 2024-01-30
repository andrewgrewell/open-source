import {
  CreateMigrationConfig,
  MigrationConfig,
  MigrationParams,
  MigrationImplContext,
  MigrationImplementation,
} from '../types';
import { createDryRunDb } from '../utils';
import { verboseLogger } from '@bridge/node-utils';

export function createMigration<TableType>(
  config: CreateMigrationConfig<TableType>,
): MigrationConfig<TableType> {
  verboseLogger.log('Config: ', config);
  return {
    description: config.description,
    async down(db, migrate, params) {
      if (!config.down) {
        // TODO support no down migration.
        //  this should be wrapping the modals in a proxy which calls the opposite
        //  of the methods called in the up runner.
        //  This would not be reliable but would work for most cases and be a good QoL feature.
      }
      await runMigration<TableType>(config.down, {
        db,
        migrate,
        params,
      });
    },
    schema: config.schema,
    async up(db, migrate, params) {
      await runMigration<TableType>(config.up, {
        db,
        migrate,
        params,
      });
    },
    version: config.version,
  } as MigrationConfig<TableType>;
}

function runMigration<TableType>(
  runner: MigrationImplementation<TableType>,
  context: Omit<MigrationImplContext<TableType>, 'dryLog'>,
) {
  const dryLog = createDryLog(context.params);
  const db = context.params.dry ? createDryRunDb(context.db) : context.db;
  return runner({ ...context, db, dryLog });
}

function createDryLog(params: MigrationParams) {
  return (message: string) => {
    if (params.dry) {
      console.log(message);
    }
  };
}
