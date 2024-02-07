import { TableModelsMap } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';

export interface CreateAccountConfig {
  email: string;
  password: string;
}

async function createAccountExecutor(
  config: CreateAccountConfig,
  models: TableModelsMap,
) {
  const { email, password } = config;
  log.verbose(`Creating account for email ${email}`);
  const { Account } = models;
  const account = await Account.create({
    email,
    password,
  });
  log.verbose(`Account created with id ${account.id}`);
  return account;
}

export const createAccount = {
  executor: createAccountExecutor,
  params: [
    {
      name: 'createAccountConfig',
      params: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'email',
          type: 'string',
        },
        {
          name: 'password',
          type: 'string',
        },
      ],
      type: 'object',
    },
  ],
};
