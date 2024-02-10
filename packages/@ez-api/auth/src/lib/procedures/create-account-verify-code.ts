import { createRandomCode } from '../utils';
import { AuthProcedureExecutor } from '../types';
import { IAccountVerifyCode } from '../table';

export type CreateAccountVerifyCodeOptions = {
  accountId: string;
  email: string;
};

export const createAccountVerifyCode: AuthProcedureExecutor<
  Promise<IAccountVerifyCode>,
  CreateAccountVerifyCodeOptions
> = (options) => {
  const { AccountVerifyCode, accountId, email } = options;
  const verifyCode = createRandomCode(6);
  return AccountVerifyCode.create({
    accountId,
    code: verifyCode,
    email,
  });
};
