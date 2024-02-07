import { TableModelsMap } from '../types';

export interface GetAccountOptions {
  email: string;
}

export const getAccount = {
  executor: async (options: GetAccountOptions, { Account }: TableModelsMap) => {
    const { email } = options;
    return Account.get({ email }, { follow: true, index: 'gs1' });
  },
  params: [
    {
      name: 'getAccountOptions',
      params: [
        {
          name: 'email',
          type: 'string',
        },
      ],
      type: 'object',
    },
  ],
};
