import { CommandBuilder } from '../../types';
import {
  starWarsTableDefLocal,
  starWarsAccessPatterns,
  initializeStarWarsDb,
} from '@starwars/db';
import { getPortFromUrl } from '@ag-oss/strings';
import { startDynamodbLocal } from '@ag-oss/dynamodb';
import { loop } from '@ag-oss/one-table';
import { withPrettyOutput } from '@ag-oss/console-ui';
import { verboseLogger as log } from '@ag-oss/logging';
import { isContainerRunning } from '@ag-oss/docker';

export const command = 'db-repl [args]';
export const desc = 'Start interactive repl for testing StarWars DB';
export const builder: CommandBuilder = {};

export const handler = async () => {
  await withPrettyOutput(async ({ spinner }) => {
    const { clientConfig } = starWarsTableDefLocal;
    log.verbose(`clientConfig: ${JSON.stringify(clientConfig)}`);
    try {
      const containerRunning = await isContainerRunning('dynamodb-local');
      log.verbose(`dynamodb-container running: ${containerRunning}`);
      if (!containerRunning) {
        spinner.start('Starting dynamodb-local');
        const port = getPortFromUrl(clientConfig.endpoint) || 8000;
        await startDynamodbLocal({
          detached: true,
          inMemory: true,
          port,
          sharedDb: true,
          silent: true,
        });
        spinner.succeed(`Dynamodb-local running on port: ${port}`);
      }
    } catch (e) {
      spinner.fail(`Failed to start dynamodb-local. ${(e as Error)?.message}`);
      return;
    }
    try {
      const { models } = await initializeStarWarsDb();
      await loop(starWarsAccessPatterns, models);
    } catch (e) {
      console.error('Error running access pattern', e);
    }
  });
};
