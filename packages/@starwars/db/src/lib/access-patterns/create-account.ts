import { TableModelsMap } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';
import { createRandomCode } from '../utils';

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
  const { Account, AccountVerifyCode } = models;
  const account = await Account.create({
    email,
    password,
  });
  const passcode = createRandomCode(6);
  await AccountVerifyCode.create({
    accountId: account.id,
    code: passcode,
    email: account.email,
  });
  log.verbose(`Account created with id ${account.id}`);
  return { account, passcode };
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
