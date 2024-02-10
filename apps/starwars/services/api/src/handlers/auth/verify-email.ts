import { tokenService } from '../../jwt';
import { createUserHandler } from '../../utils/create-user-handler';
import { BodyParams, httpErrorResponse, httpSuccessResponse } from '@ez-api/lambda';
import { verifyEmail } from '@ez-api/auth';
import { execute } from '../../utils/execute';

type Body = BodyParams<{ code: string; idToken: string }>;

export const handler = createUserHandler<Body>(async (event) => {
  const { code, idToken } = event.body;
  try {
    const { email, accountId } = await tokenService.id.verify(idToken);
    console.log(`Attempting to verify email "${email}" with code "${code}"...`);
    await execute(verifyEmail, { accountId, code, email });
    return httpSuccessResponse({ userMessage: `Verified email "${email}".` });
  } catch (e) {
    console.log(`Failed to verify email.`);
    console.log(e?.message);
    return httpErrorResponse('Unable to verify email. Please try again.');
  }
});
