import { createAccount, createUserTokens } from '@ez-api/auth';
import { dataModels } from '../../db';
import { sendVerifyEmail } from '../../email';
import { tokenService } from '../../jwt';
import { createPublicHandler } from '../../utils/create-public-handler';
import { httpErrorResponse, BodyParams, httpSuccessResponse } from '@ez-api/lambda';

type Body = BodyParams<{ email: string; password: string }>;

export const handler = createPublicHandler<Body>(async (event) => {
  const { email, password } = event.body;
  try {
    console.log(`Attempting create account for email "${email}"...`);
    const { account, verifyCode } = await createAccount.executor(
      { email, password },
      dataModels,
    );
    console.log(`Account created for email "${account.email}".`);
    console.log(`Sending verify email...`);
    await sendVerifyEmail({ email, verifyCode });
    console.log(`Verify email sent.`);
    const tokens = await createUserTokens({
      accountId: account.id,
      dataModels,
      email: account.email,
      tokenService,
    });
    console.log(`Account signed in.`);
    return httpSuccessResponse({ ...tokens });
  } catch (e) {
    console.log(`Failed to create account.`);
    console.log(e?.message);
    return httpErrorResponse('Unable to create account. Please try again.');
  }
});
