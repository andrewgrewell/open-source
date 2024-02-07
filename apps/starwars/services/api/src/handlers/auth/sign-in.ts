import { signIn } from '@starwars/db';
import { BodyParams, createHandler, httpError, httpResponse } from '@ag-oss/serverless';
import { tokenService } from '../../jwt';
import { dataModels } from '../../db';

type Body = BodyParams<{ email: string; password: string }>;

export const handler = createHandler<Body>(async (event) => {
  const { email, password } = event.body;
  try {
    console.log(`Attempting sign in with email "${email}"...`);
    const tokens = await signIn.executor({ email, password, tokenService }, dataModels);
    console.log(`Account signed in.`);
    return httpResponse({ ...tokens });
  } catch (e) {
    console.log(`Failed sign in attempt.`);
    console.log(e?.message);
    return httpError('Authentication failed. Please try again.');
  }
});
