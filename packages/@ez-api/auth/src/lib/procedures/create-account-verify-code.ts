import { TableModelsMap } from '../types';
import { createRandomCode } from '../utils';

export interface CreateAccountVerifyCodeOptions {
  accountId: string;
  email: string;
}

async function createAccountVerifyCodeExecutor(
  options: CreateAccountVerifyCodeOptions,
  models: TableModelsMap,
) {
  const { accountId, email } = options;
  const { AccountVerifyCode } = models;
  const passcode = createRandomCode(6);
  await AccountVerifyCode.create({
    accountId,
    code: passcode,
    email,
  });
}

export const createAccountVerifyCode = {
  executor: createAccountVerifyCodeExecutor,
  params: [
    {
      name: 'createAccountVerifyCodeConfig',
      params: [
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
