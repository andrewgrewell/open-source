import { IAccount, StarWarsTokenService, TableModelsMap } from '../types';
import { getAccount } from './get-account';
import { verboseLogger as log } from '@ag-oss/logging';

export interface SignInOptions {
  email: string;
  password: string;
  tokenService: StarWarsTokenService;
}

export const signIn = {
  executor: async (
    options: SignInOptions,
    dataModels: TableModelsMap,
  ): Promise<IAccount> => {
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
    log.verbose('Password is correct.');
    return account;
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
