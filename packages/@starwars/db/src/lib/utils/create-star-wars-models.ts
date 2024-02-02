import { StarWarsTable, IOrg, IUser, TableModelsMap } from '../types';

export function createStarWarsModels(table: StarWarsTable): TableModelsMap {
  return {
    Org: table.getModel<IOrg>('Org'),
    User: table.getModel<IUser>('User'),
    table,
  };
}
