import { TableModelsMap } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';

export interface GetAccountOptions {
  email: string;
}

export const getAccount = {
  executor: async (options: GetAccountOptions, { Account }: TableModelsMap) => {
    const { email } = options;
    log.verbose(`Getting account for email: "${email}"...`);
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
