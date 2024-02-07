import { StarWarsTokenService, TableModelsMap } from '../types';
import { getAccount } from './get-account';
import { createUserTokens } from '../utils';
import { verboseLogger as log } from '@ag-oss/logging';

export interface SignInOptions {
  email: string;
  password: string;
  tokenService: StarWarsTokenService;
}

export const signIn = {
  executor: async (options: SignInOptions, dataModels: TableModelsMap) => {
    const { email, password, tokenService } = options;
    if (!tokenService) {
      throw new Error('tokenService is required.');
    }
    log.verbose(`Getting account for email: "${email}"...`);
    const account = await getAccount.executor({ email }, dataModels);
    if (!account) {
      throw new Error(`No account found for account "${email}".`);
    }
    log.verbose(`Found account with email: "${account.email}". Validating password...`);
    if (account.password !== password) {
      throw new Error('Password is incorrect.');
    }
    log.verbose(`Password is correct. Creating tokens...`);
    const tokens = await createUserTokens({
      accountId: account.id,
      dataModels,
      email: account.email,
      tokenService,
    });
    log.verbose('Returning tokens to caller.');
    return tokens;
  },
  params: [
    {
      name: 'signInOptions',
      params: [
        {
          name: 'email',
          type: 'string',
        },
        {
          name: 'password',
          type: 'string',
        },
      ],
      type: 'object',
    },
  ],
};
