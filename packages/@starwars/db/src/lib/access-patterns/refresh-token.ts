import { StarWarsTokenService, TableModelsMap } from '../types';
import { createUserTokens } from '../utils';
import { verboseLogger as log } from '@ag-oss/logging';
import { getAccountToken } from './get-account-token';

export interface RefreshTokenOptions {
  token: string;
  tokenService: StarWarsTokenService;
}

export const refreshToken = {
  executor: async (options: RefreshTokenOptions, dataModels: TableModelsMap) => {
    const { token, tokenService } = options;
    if (!tokenService) {
      throw new Error('tokenService is required.');
    }
    const { accountId, email } = await tokenService.refresh.verify(token);
    const accountToken = await getAccountToken.executor({ accountId }, dataModels);
    if (!accountToken || accountToken.token !== token) {
      throw new Error('Invalid token.');
    }
    log.verbose(`Token is valid. Creating new tokens for ${email}(${accountId})...`);
    const tokens = await createUserTokens({
      accountId,
      dataModels,
      email,
      tokenService,
    });
    log.verbose('Returning new tokens to caller.');
    return tokens;
  },
  params: [
    {
      name: 'refreshTokenOptions',
      params: [
        {
          name: 'token',
          type: 'string',
        },
        {
          name: 'tokenService',
          type: 'object',
        },
      ],
      type: 'object',
    },
  ],
};
