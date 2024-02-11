import { BodyParams, httpErrorResponse, httpSuccessResponse } from '@ez-api/lambda';
import { signIn } from '@ez-api/auth';
import { tokenService } from '../../jwt';
import { createPublicHandler } from '../../utils/create-public-handler';
import { execute } from '../../utils/execute';

type Body = BodyParams<{ email: string; password: string }>;

export const handler = createPublicHandler<Body>(async (event) => {
  const { email, password } = event.body;
  try {
    console.log(`Attempting sign in with email "${email}"...`);
    const tokens = await execute(signIn, { email, password, tokenService });
    console.log(`Account signed in.`);
    return httpSuccessResponse(tokens);
  } catch (e) {
    console.log(`Failed sign in attempt.`);
    console.log(e?.message);
    return httpErrorResponse('Authentication failed. Please try again.');
  }
});
