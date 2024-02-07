import {
  BodyParams,
  createProtectedHandler,
  httpError,
  httpResponse,
} from '@ag-oss/serverless';
import { config } from '../../config';

type Body = BodyParams<{ code: string }>;

export const handler = createProtectedHandler<Body>(
  async (event) => {
    const { code } = event.body;
    try {
      const email = 'test-email@email.com'; // TODO: pull email from token
      console.log(`Attempting to verify email "${email}" with code "${code}"...`);
      const verifiedEmail = 'email-to-verify';
      // verifyEmail will invalidate the code after one use
      // const verifiedEmail = await verifyEmail.executor({ email, code }, dataModels);
      // const tokens = await signIn.executor({ email, password, tokenService }, dataModels);
      console.log(`Verified email "${verifiedEmail}".`);
      return httpResponse({ userMessage: `Verified email "${verifiedEmail}".` });
    } catch (e) {
      console.log(`Failed to verify email.`);
      console.log(e?.message);
      return httpError('Unable to verify email. Please try again.');
    }
  },
  { secret: config.jwt.accessKey },
);
