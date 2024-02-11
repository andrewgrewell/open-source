import { createLocalStarWarsTable, getStarWarsModels } from '@starwars/db';

export const Table = createLocalStarWarsTable({
  log: true,
});

export const models = getStarWarsModels(Table);
