import { verboseLogger as log } from '@ag-oss/logging';
import { IAccountToken } from '../table';
import { AuthProcedureExecutor } from '../types';

export type CreateAccountTokenOptions = {
  accountId: string;
  email: string;
  token: string;
};

export const createAccountToken: AuthProcedureExecutor<
  Promise<IAccountToken>,
  CreateAccountTokenOptions
> = async (options) => {
  const { AccountToken, accountId, email, token } = options;
  log.verbose(`Creating account token for account ${email}`);
  const accountToken = await AccountToken.create(
    {
      accountId,
      email,
      token,
    },
    { exists: null },
  );
  log.verbose(`AccountToken created for account ${email}`);
  return accountToken;
};
