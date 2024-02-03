import { CommandBuilder } from '../../types';
import { starWarsTableDef } from '@starwars/db';
import { createLocalClientConfig, startDynamodbLocal } from '@ag-oss/dynamodb';
import { runMigrations } from '@ag-oss/one-table';
import { withPrettyOutput } from '@ag-oss/console-ui';
import { verboseLogger as log } from '@ag-oss/logging';
import { getContainerPorts } from '@ag-oss/docker';
import prompts from 'prompts';

export const command = 'migrate [args]';
export const desc = 'Run migration';
export const builder: CommandBuilder = {
  apply: {
    alias: 'a',
    default: false,
    describe: 'Apply migrations, otherwise it defaults to dry run',
    type: 'boolean',
  },
};

export interface Args {
  apply: boolean;
}

export const handler = async (args: Args) => {
  const { apply } = args;
  log.verbose(`Running migrations with apply=${apply}`);
  await withPrettyOutput(async ({ spinner }) => {
    try {
      const containerPorts = await getContainerPorts('dynamodb-local');
      let port = containerPorts?.external;
      if (!port) {
        spinner.fail(
          `Failed to find dynamodb-local container port. Are you sure it's running?`,
        );
        const { startDynamodb } = await prompts({
          initial: true,
          message: 'Would you like to start dynamodb-local?',
          name: 'startDynamodb',
          type: 'confirm',
        });
        if (!startDynamodb) {
          return;
        }
        port = 8000;
        try {
          spinner.start('Starting dynamodb-local');
          await startDynamodbLocal({
            detached: true,
            inMemory: true,
            port,
            sharedDb: true,
            silent: true,
          });
          spinner.succeed(`Dynamodb-local running on port: ${port}`);
        } catch (e) {
          spinner.fail(`Failed to start dynamodb-local. ${(e as Error)?.message}`);
          return;
        }
      }
      const clientConfig = createLocalClientConfig(port);
      await runMigrations({
        apply,
        clientConfig: clientConfig,
        migrationConfig: {
          migrations: starWarsTableDef.migrations,
          schema: starWarsTableDef.schema,
          tableName: starWarsTableDef.name,
        },
      });
    } catch (e) {
      spinner.fail((e as Error)?.message || 'Failed to run migrations');
      log.verbose(e);
      return;
    }
  });
};
