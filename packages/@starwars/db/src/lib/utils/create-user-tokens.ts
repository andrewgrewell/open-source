import { StarWarsTokenService, TableModelsMap } from '../types';
import { createAccountToken } from '../access-patterns';

export interface CreateAccountTokensOptions {
  accountId: string;
  email: string;
  tokenService: StarWarsTokenService;
  dataModels: TableModelsMap;
}
export async function createUserTokens(options: CreateAccountTokensOptions) {
  const { tokenService, dataModels, accountId, email } = options;
  const accessToken = await tokenService.access.sign({ subject: accountId });
  const idToken = await tokenService.id.sign({
    payload: { accountId, email },
  });
  const refreshToken = await tokenService.refresh.sign({ payload: { accountId, email } });
  console.log('Tokens created, persisting refresh token...');
  await createAccountToken.executor(
    { accountId, email, token: refreshToken },
    dataModels,
  );
  return {
    accessToken,
    idToken,
    refreshToken,
  };
}
