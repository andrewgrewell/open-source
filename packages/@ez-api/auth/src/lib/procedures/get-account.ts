import { AuthProcedureExecutor } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';
import { IAccount } from '../table';

export type GetAccountOptions = {
  email: string;
  accountId?: string;
};

export const getAccount: AuthProcedureExecutor<
  Promise<IAccount>,
  GetAccountOptions
> = async (options) => {
  const { Account, accountId, email } = options;
  if (accountId) {
    log.verbose(`Getting account for account ID: "${accountId}"...`);
    return Account.get({ id: accountId });
  }
  log.verbose(`Getting account for email: "${email}"...`);
  return Account.get({ email }, { follow: true, index: 'gs1' });
};
