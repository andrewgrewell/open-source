import { TableModelsMap } from '../types';
import { verboseLogger as log } from '@ag-oss/logging';

export interface GetAccountTokenOptions {
  accountId: string;
}

export const getAccountToken = {
  executor: async (options: GetAccountTokenOptions, { AccountToken }: TableModelsMap) => {
    const { accountId } = options;
    log.verbose(`Getting account token for account: "${accountId}"...`);
    return AccountToken.get({ accountId });
  },
  params: [
    {
      name: 'getAccountTokenOptions',
      params: [
        {
          name: 'accountId',
          type: 'string',
        },
      ],
      type: 'object',
    },
  ],
};
