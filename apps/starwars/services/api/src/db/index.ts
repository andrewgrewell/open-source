import {
  createStarWarsModels,
  createStarWarsTable,
  starWarsTableDefLocal,
} from '@starwars/db';
import { createOneTableClient } from '@ag-oss/one-table';

export const db = createStarWarsTable({
  client: createOneTableClient(starWarsTableDefLocal.clientConfig),
  logger: true,
});

export const dataModels = createStarWarsModels(db);
