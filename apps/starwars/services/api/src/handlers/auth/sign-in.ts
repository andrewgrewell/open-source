import {
  createStarWarsModels,
  createStarWarsTable,
  signIn,
  starWarsTableDefLocal,
} from '@starwars/db';
import {
  BodyParams,
  createProtectedHandler,
  httpError,
  httpResponse,
} from '@ag-oss/serverless';
import { createOneTableClient } from '@ag-oss/one-table';
import { tokenProvider } from './token-provider';

type Body = BodyParams<{ email: string; password: string }>;

export const handler = createProtectedHandler<Body>(async (event, context) => {
  const { email, password } = event.body;
  try {
    // TODO move the db ref and table models to context
    const db = createStarWarsTable({
      client: createOneTableClient(starWarsTableDefLocal.clientConfig),
      logger: true,
    });
    const tableModels = createStarWarsModels(db);
    //--------------------------------------------------------------------------------
    console.log(`Attempting sign in with email "${email}"`);
    const tokens = await signIn.executor({ email, password, tokenProvider }, tableModels);
    console.log(`Account signed in.`);
    // TODO: create refresh token endpoint
    return httpResponse({ ...tokens });
  } catch (e) {
    console.log(`Failed sign in attempt`);
    console.log(e?.message);
    return httpError('Authentication failed. Please try again.');
  }
});
