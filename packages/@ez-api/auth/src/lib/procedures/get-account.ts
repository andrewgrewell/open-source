import { TableModelsMap } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';

export interface GetAccountOptions {
  email: string;
  accountId?: string;
}

export const getAccount = {
  executor: async (options: GetAccountOptions, { Account }: TableModelsMap) => {
    const { accountId, email } = options;
    if (accountId) {
      log.verbose(`Getting account for account ID: "${accountId}"...`);
      return Account.get({ id: accountId });
    }
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
        {
          name: 'accountId',
          type: 'string',
        },
      ],
      type: 'object',
    },
  ],
};
