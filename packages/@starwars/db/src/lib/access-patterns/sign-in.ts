import { TableModelsMap } from '../types';
import { getAccount } from './get-account';
import { createAccountToken } from './create-account-token';

export interface SignInOptions {
  email: string;
  password: string;
  tokenProvider: (options: { sub: string }) => {
    accessToken: string;
    refreshToken: string;
  };
}

export const signIn = {
  executor: async (options: SignInOptions, modelsMaps: TableModelsMap) => {
    const { email, password, tokenProvider } = options;
    if (!tokenProvider) {
      throw new Error('Token provider is required');
    }
    console.log(`Getting account for email: "${email}"`);
    const account = await getAccount.executor({ email }, modelsMaps);
    if (!account) {
      throw new Error(`No account found for account "${email}"`);
    }
    console.log(`Found account with email: "${account.email}". Validating password...`);
    if (account.password !== password) {
      throw new Error('Password is incorrect');
    }
    console.log(`Password is correct. Creating tokens...`);
    const tokens = tokenProvider({ sub: account.id });
    await createAccountToken.executor(
      { accountId: account.id, email: account.email, token: tokens.refreshToken },
      modelsMaps,
    );
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
