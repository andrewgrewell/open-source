import { StarWarsTable, TableModelsMap, IAccount, IAccountToken } from '../types';

export function createStarWarsModels(table: StarWarsTable): TableModelsMap {
  return {
    Account: table.getModel<IAccount>('Account'),
    AccountToken: table.getModel<IAccountToken>('AccountToken'),
    table,
  };
}
