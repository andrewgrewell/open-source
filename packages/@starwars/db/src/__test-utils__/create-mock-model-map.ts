import { DbFixture } from '../__fixtures__/default-db.fixture';
import { IAccount, IAccountToken, TableModelName, TableModelsMap } from '../lib/types';
import { createMockModel, createMockTable } from '@ag-oss/one-table';
import { Model } from 'dynamodb-onetable';

type Table = ReturnType<typeof createMockTable>;
type MockDbRef = { current?: DbFixture };

export function createMockModelMap(mockDbRef: MockDbRef, table: Table): TableModelsMap {
  const modelMap: Omit<TableModelsMap, 'table'> = {
    Account: setupMockAccount(mockDbRef) as never as Model<IAccount>,
    // TODO: create this mock and test the account token flow
    AccountToken: {} as never as Model<IAccountToken>,
  };
  table.getModel.mockImplementation((modelName: TableModelName) => {
    return modelMap[modelName];
  });
  return {
    ...modelMap,
    table,
  } as never as TableModelsMap;
}

function setupMockAccount(dbRef: MockDbRef) {
  // create mock model
  const Account = createMockModel();
  let accountCount = dbRef.current?.Account?.length || 0;
  Account.create.mockImplementation((accountCreate) => {
    if (!dbRef.current) {
      throw new Error('Table does not exist');
    }
    const accounts = dbRef.current?.Account ?? [];
    accountCount += 1;
    const accountId = `account-id-${accountCount}`;
    const newAcc = {
      ...accountCreate,
      id: accountId,
      pk: `account#${accountId}`,
      sk: `account#${accountCreate.email}#${accountCreate.name}`,
    };
    const exists = accounts.find((acc) => acc.sk === newAcc.sk);
    if (exists) {
      throw new Error('Account already exists');
    }
    dbRef.current.Account = [...accounts, newAcc];
    return newAcc;
  });
  Account.get.mockImplementation((orgId) => {
    if (!dbRef.current) {
      throw new Error('Table does not exist');
    }
    const accounts = dbRef.current?.Account ?? [];
    const account = accounts.find((org) => org.id === orgId);
    if (!account) {
      return undefined;
    }
    return account;
  });
  Account.update.mockImplementation((accUpdate) => {
    if (!dbRef.current) {
      throw new Error('Table does not exist');
    }
    const accounts = dbRef.current?.Account ?? [];
    const account = accounts.find((acc) => acc.pk === accUpdate.pk);
    if (!account) {
      throw new Error('Account does not exist');
    }
    const update = { ...account, accUpdate };
    const index = accounts.findIndex((acc) => acc.pk === accUpdate.pk);
    dbRef.current.Account.splice(index, 1, update);
    dbRef.current.Account = [...dbRef.current.Account];
    return account;
  });

  return Account;
}
