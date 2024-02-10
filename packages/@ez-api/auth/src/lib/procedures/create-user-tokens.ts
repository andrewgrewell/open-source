import { verboseLogger as log } from '@ag-oss/logging';
import { AuthProcedureExecutor, AuthTokenService } from '../types';
import { createAccountToken } from './create-account-token';

export type CreateAccountTokensOptions = {
  accountId: string;
  email: string;
  tokenService: AuthTokenService;
};

export interface CreateAccountTokensResult {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

export const createUserTokens: AuthProcedureExecutor<
  Promise<CreateAccountTokensResult>,
  CreateAccountTokensOptions
> = async (options) => {
  const { tokenService, accountId, email } = options;
  log.verbose('Creating access token...');
  const accessToken = await tokenService.access.sign({
    payload: { accountId, email },
    subject: accountId,
  });
  log.verbose('Creating ID token...');
  const idToken = await tokenService.id.sign({
    payload: { accountId, email },
  });
  log.verbose('Creating refresh token...');
  const refreshToken = await tokenService.refresh.sign({ payload: { accountId, email } });
  log.verbose('Tokens created, persisting refresh token...');
  await createAccountToken({ ...options, accountId, email, token: refreshToken });
  log.verbose('Tokens persisted. Returning tokens to caller.');
  return {
    accessToken,
    idToken,
    refreshToken,
  };
};
