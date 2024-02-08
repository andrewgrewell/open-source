import { createAccount, createUserTokens } from '@starwars/db';
import { BodyParams, createHandler, httpError, httpResponse } from '@ag-oss/serverless';
import { dataModels } from '../../db';
import { sendVerifyEmail } from '../../email';
import { tokenService } from '../../jwt';

type Body = BodyParams<{ email: string; password: string }>;

export const handler = createHandler<Body>(async (event) => {
  const { email, password } = event.body;
  try {
    console.log(`Attempting create account for email "${email}"...`);
    const { account, passcode } = await createAccount.executor(
      { email, password },
      dataModels,
    );
    console.log(`Account created for email "${account.email}".`);
    console.log(`Sending verify email...`);
    await sendVerifyEmail({ email, passcode });
    console.log(`Verify email sent.`);
    const tokens = await createUserTokens({
      accountId: account.id,
      dataModels,
      email: account.email,
      tokenService,
    });
    console.log(`Account signed in.`);
    return httpResponse({ ...tokens });
  } catch (e) {
    console.log(`Failed to create account.`);
    console.log(e?.message);
    return httpError('Unable to create account. Please try again.');
  }
});
