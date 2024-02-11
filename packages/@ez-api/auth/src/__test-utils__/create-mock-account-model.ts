import { createMockModel } from '@ag-oss/one-table';
import { MockDbRef } from './types';

export function createMockAccountModel(dbRef: MockDbRef) {
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
      sk: `account#${accountCreate.email}`,
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
