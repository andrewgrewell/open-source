import { createUserTokens, signIn } from '@starwars/db';
import { BodyParams } from '@ag-oss/serverless';
import { tokenService } from '../../jwt';
import { dataModels } from '../../db';
import { createPublicHandler } from '../../utils/create-public-handler';
import { httpErrorResponse, httpSuccessResponse } from '@ez-api/lambda';

type Body = BodyParams<{ email: string; password: string }>;

export const handler = createPublicHandler<Body>(async (event) => {
  const { email, password } = event.body;
  try {
    console.log(`Attempting sign in with email "${email}"...`);
    const account = await signIn.executor({ email, password, tokenService }, dataModels);
    if (account.verifiedEmail !== email) {
      console.log(`Account has not verified email.`);
      // TODO: create mapping of responses to support custom handling on the client
      return httpErrorResponse(
        'Your email has not been verified, please check your inbox and verify your email.',
        { statusCode: 401 },
      );
    }
    const tokens = await createUserTokens({
      accountId: account.id,
      dataModels,
      email: account.email,
      tokenService,
    });
    console.log(`Account signed in.`);
    return httpSuccessResponse({ ...tokens });
  } catch (e) {
    console.log(`Failed sign in attempt.`);
    console.log(e?.message);
    return httpErrorResponse('Authentication failed. Please try again.');
  }
});
