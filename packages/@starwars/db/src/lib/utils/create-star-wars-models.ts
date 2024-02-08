import {
  StarWarsTable,
  TableModelsMap,
  IAccount,
  IAccountToken,
  IAccountVerifyCode,
} from '../types';

export function createStarWarsModels(table: StarWarsTable): TableModelsMap {
  return {
    Account: table.getModel<IAccount>('Account'),
    AccountToken: table.getModel<IAccountToken>('AccountToken'),
    AccountVerifyCode: table.getModel<IAccountVerifyCode>('AccountVerifyCode'),
    table,
  };
}
