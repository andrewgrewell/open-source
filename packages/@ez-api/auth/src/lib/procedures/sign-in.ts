/* istanbul ignore file */
import { AuthProcedureExecutor, AuthTokenService } from '../types';
import { getAccount } from './get-account';
import { verboseLogger as log } from '@ag-oss/logging';
import { createUserTokens, UserTokens } from './create-user-tokens';

export type SignInOptions = {
  email: string;
  password: string;
  tokenService: AuthTokenService;
};

export const signIn: AuthProcedureExecutor<Promise<UserTokens>, SignInOptions> = async (
  options,
) => {
  const { email, password } = options;
  log.verbose(`Getting account for email: "${email}"...`);
  const account = await getAccount({ ...options, email });
  if (!account) {
    throw new Error(`No account found for account "${email}".`);
  }
  log.verbose(`Found account with email: "${account.email}". Validating password...`);
  if (account.password !== password) {
    throw new Error('Password is incorrect.');
  }
  log.verbose('Password is correct.');
  if (account.verifiedEmail !== account.email) {
    // TODO: return specific errors so that the code can be extracted and handled on the client
    throw new Error('Email is not verified.');
  }
  return createUserTokens({
    ...options,
    accountId: account.id,
    email: account.email,
  });
};
