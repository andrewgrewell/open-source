/* istanbul ignore file */
import { AuthProcedureExecutor } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';
import { IAccountToken } from '../table';

export type GetAccountTokenOptions = {
  accountId: string;
};

export const getAccountToken: AuthProcedureExecutor<
  Promise<IAccountToken>,
  GetAccountTokenOptions
> = async (options) => {
  const { AccountToken, accountId } = options;
  log.verbose(`Getting account token for account: "${accountId}"...`);
  return AccountToken.get({ accountId });
};
