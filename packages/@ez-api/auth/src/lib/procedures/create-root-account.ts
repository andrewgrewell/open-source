import { AuthProcedureExecutor } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';
import { BasicRole } from '@ez-api/core';
import { verifyEmail } from './verify-email';
import { createAccount } from './create-account';
import { IAccount } from '../table';
import { CreateAccountVerifyCodeOptions } from './create-account-verify-code';

export const createRootAccount: AuthProcedureExecutor<
  Promise<IAccount>,
  CreateAccountVerifyCodeOptions
> = async (options) => {
  log.verbose('Adding admin account');
  const { account, passcode } = await createAccount({
    ...options,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: BasicRole.Admin,
  });
  log.verbose('Auto verifying admin account email.');
  await verifyEmail({
    ...options,
    accountId: account.id,
    code: passcode,
    email: account.email,
  });
  return account;
};
