import { verboseLogger as log } from '@ag-oss/logging';
import { createRandomCode } from '../utils';
import { BasicRole } from '@ez-api/core';
import { IAccount } from '../table';
import { AuthProcedureExecutor } from '../types';

export type CreateAccountOptions = {
  email: string;
  password: string;
  role?: BasicRole;
};

interface CreateAccountReturn {
  account: IAccount;
  passcode: string;
}

export const createAccount: AuthProcedureExecutor<
  Promise<CreateAccountReturn>,
  CreateAccountOptions
> = async (options) => {
  const { Account, AccountVerifyCode, email, password, role } = options;
  log.verbose(`Creating account for email ${email}`);
  const account = await Account.create({
    email,
    password,
    role,
  });
  const passcode = createRandomCode(6);
  await AccountVerifyCode.create({
    accountId: account.id,
    code: passcode,
    email: account.email,
  });
  log.verbose(`Account created with id ${account.id}`);
  return { account, passcode };
};
