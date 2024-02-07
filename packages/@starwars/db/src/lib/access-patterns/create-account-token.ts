import { TableModelsMap } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';

export interface CreateAccountTokenConfig {
  accountId: string;
  email: string;
  token: string;
}

async function createAccountTokenExecutor(
  config: CreateAccountTokenConfig,
  models: TableModelsMap,
) {
  const { accountId, email, token } = config;
  log.verbose(`Creating account token for account ${email}`);
  const { AccountToken } = models;
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
}

export const createAccountToken = {
  executor: createAccountTokenExecutor,
  params: [
    {
      name: 'createAccountTokenConfig',
      params: [
        {
          name: 'accountId',
          type: 'string',
        },
        {
          name: 'email',
          type: 'string',
        },
        {
          name: 'token',
          type: 'string',
        },
      ],
      type: 'object',
    },
  ],
};
