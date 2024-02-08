import { BodyParams } from '@ag-oss/serverless';
import { tokenService } from '../../jwt';
import { dataModels } from '../../db';
import { refreshToken } from '@starwars/db';
import { createPublicHandler } from '../../utils/create-public-handler';
import { httpErrorResponse, httpSuccessResponse } from '@ez-api/lambda';

type Body = BodyParams<{ token: string }>;

export const handler = createPublicHandler<Body>(async (event) => {
  const { token } = event.body;
  try {
    console.log(`Attempting token refresh...`);
    const tokens = await refreshToken.executor({ token, tokenService }, dataModels);
    console.log(`Token refreshed. Returning new tokens.`);
    return httpSuccessResponse({ ...tokens });
  } catch (e) {
    console.log(`Failed to refresh token.`);
    console.log(e?.message);
    return httpErrorResponse(
      'Failed to refresh authentication token. Please sign back in.',
      {
        statusCode: 401,
      },
    );
  }
});
