import { AuthProcedureExecutor } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';

export type VerifyEmailOptions = {
  accountId: string;
  code: string;
  email: string;
};

export const verifyEmail: AuthProcedureExecutor<
  Promise<void>,
  VerifyEmailOptions
> = async (options) => {
  const { Account, AccountVerifyCode, accountId, code, email } = options;
  log.verbose(`Verifying email: "${email}" with code "${code}"...`);
  const account = await Account.get({ id: accountId });
  if (account.verifiedEmail === email) {
    console.log('Email already verified.');
    return;
  }
  if (!account) {
    throw new Error(`No account found for account "${accountId}".`);
  }
  if (account.email !== email) {
    throw new Error('Email does not match account.');
  }
  const verifyCode = await AccountVerifyCode.get({ accountId });
  if (!verifyCode) {
    throw new Error('No verification code found for account.');
  }
  if (verifyCode.code !== code) {
    throw new Error('Verification code is incorrect.');
  }
  account.verifiedEmail = email;
  await Account.update({ id: accountId, verifiedEmail: email });
  console.log(`Verified email "${email}".`);
};
