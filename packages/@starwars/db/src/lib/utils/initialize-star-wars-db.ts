import { starWarsTableDef } from '../starwars.table-def';
import { createStarWarsModels } from './create-star-wars-models';
import { createStarWarsTable } from './create-star-wars-table';
import { CreateDynamodbClientConfig } from '@ag-oss/dynamodb';
import { createOneTableClient } from '@ag-oss/one-table';
import { withPrettyOutput } from '@ag-oss/console-ui';

export interface InitializeDbResult {
  table: ReturnType<typeof createStarWarsTable>;
  models: ReturnType<typeof createStarWarsModels>;
}

export async function initializeStarWarsDb(clientConfig?: CreateDynamodbClientConfig) {
  return withPrettyOutput<InitializeDbResult>(async ({ spinner }) => {
    const table = createStarWarsTable({
      client: createOneTableClient(clientConfig || starWarsTableDef.clientConfig),
    });
    if (!(await table.exists())) {
      spinner.start('Creating table');
      await table.createTable();
      spinner.succeed('Table created');
    }
    const models = createStarWarsModels(table);
    return { models, table };
  });
}
