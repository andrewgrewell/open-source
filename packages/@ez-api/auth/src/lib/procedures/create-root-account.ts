import { TableModelsMap } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';
import { BasicRole } from '@ez-api/core';
import { verifyEmail } from './verify-email';
import { createAccount } from './create-account';

async function createRootAccountExecutor(models: TableModelsMap) {
  log.verbose('Adding admin account');
  const { account, passcode } = await createAccount.executor(
    {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: BasicRole.Admin,
    },
    models,
  );
  log.verbose('Auto verifying admin account email.');
  await verifyEmail.executor(
    {
      accountId: account.id,
      code: passcode,
      email: account.email,
    },
    models,
  );
  return account;
}

export const createRootAccount = {
  executor: createRootAccountExecutor,
  params: [],
};
