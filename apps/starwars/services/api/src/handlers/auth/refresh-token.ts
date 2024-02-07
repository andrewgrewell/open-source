import { BodyParams, createHandler, httpError, httpResponse } from '@ag-oss/serverless';
import { tokenService } from '../../jwt';
import { dataModels } from '../../db';
import { refreshToken } from '@starwars/db';

type Body = BodyParams<{ token: string }>;

export const handler = createHandler<Body>(async (event) => {
  const { token } = event.body;
  try {
    console.log(`Attempting token refresh...`);
    const tokens = await refreshToken.executor({ token, tokenService }, dataModels);
    console.log(`Token refreshed. Returning new tokens.`);
    return httpResponse({ ...tokens });
  } catch (e) {
    console.log(`Failed to refresh token.`);
    console.log(e?.message);
    return httpError('Failed to refresh authentication token. Please sign back in.', {
      statusCode: 401,
    });
  }
});
