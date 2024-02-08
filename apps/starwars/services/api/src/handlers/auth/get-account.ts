import { createProtectedHandler, httpError, httpResponse } from '@ag-oss/serverless';
import { dataModels } from '../../db';
import { config } from '../../config';
import { getAccount } from '@starwars/db';

export const handler = createProtectedHandler(
  async (_, context) => {
    try {
      const { accountId, email } = context.auth;
      console.log(`Attempting to get account "${accountId}"...`);
      const account = await getAccount.executor({ accountId, email }, dataModels);
      console.log(`Returning account ${account.email}`);
      return httpResponse({ account });
    } catch (e) {
      console.log(`Failed get account.`);
      console.log(e?.message);
      return httpError('Unable to get account. Please try again.');
    }
  },
  { secret: config.jwt.accessKey },
);
