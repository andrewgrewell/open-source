import { createUserHandler } from '../../utils/create-user-handler';
import { httpErrorResponse, httpSuccessResponse } from '@ez-api/lambda';
import { getAccount } from '@ez-api/auth';
import { execute } from '../../utils/execute';

export const handler = createUserHandler(async (_, context) => {
  try {
    const { accountId, email } = context.auth;
    console.log(`Attempting to get account "${accountId}"...`);
    // const account = await getAccount({ Table, ...models, accountId, email });
    const account = await execute(getAccount, { accountId, email });
    console.log(`Returning account ${account.email}`);
    return httpSuccessResponse({ account });
  } catch (e) {
    console.log(`Failed get account.`);
    console.log(e?.message);
    return httpErrorResponse('Unable to get account. Please try again.');
  }
});
