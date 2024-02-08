import { StarWarsTokenService, TableModelsMap } from '../types';
import { createAccountToken } from '../access-patterns';
import { verboseLogger as log } from '@ag-oss/logging';

export interface CreateAccountTokensOptions {
  accountId: string;
  email: string;
  tokenService: StarWarsTokenService;
  dataModels: TableModelsMap;
}
export async function createUserTokens(options: CreateAccountTokensOptions) {
  const { tokenService, dataModels, accountId, email } = options;
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
  await createAccountToken.executor(
    { accountId, email, token: refreshToken },
    dataModels,
  );
  log.verbose('Tokens persisted. Returning tokens to caller.');
  return {
    accessToken,
    idToken,
    refreshToken,
  };
}
