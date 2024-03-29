/* istanbul ignore file */
import { AuthProcedureExecutor, AuthTokenService } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';
import { getAccountToken } from './get-account-token';
import { createUserTokens } from './create-user-tokens';

export type RefreshTokenOptions = {
  token: string;
  tokenService: AuthTokenService;
};

export const refreshToken: AuthProcedureExecutor<
  ReturnType<typeof createUserTokens>,
  RefreshTokenOptions
> = async (options) => {
  const { token, tokenService } = options;
  if (!tokenService) {
    throw new Error('tokenService is required.');
  }
  const { accountId, email } = await tokenService.refresh.verify(token);
  const accountToken = await getAccountToken({ ...options, accountId });
  if (!accountToken || accountToken.token !== token) {
    throw new Error('Invalid token.');
  }
  log.verbose(`Token is valid. Creating new tokens for ${email}(${accountId})...`);
  const tokens = await createUserTokens({
    ...options,
    accountId,
    email,
    tokenService,
  });
  log.verbose('Returning new tokens to caller.');
  return tokens;
};
