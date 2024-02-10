import { BodyParams } from '@ez-api/lambda';
import { tokenService } from '../../jwt';
import { createPublicHandler } from '../../utils/create-public-handler';
import { httpErrorResponse, httpSuccessResponse } from '@ez-api/lambda';
import { refreshToken } from '@ez-api/auth';
import { execute } from '../../utils/execute';

type Body = BodyParams<{ token: string }>;

export const handler = createPublicHandler<Body>(async (event) => {
  const { token } = event.body;
  try {
    console.log(`Attempting token refresh...`);
    const tokens = await execute(refreshToken, { token, tokenService });
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
