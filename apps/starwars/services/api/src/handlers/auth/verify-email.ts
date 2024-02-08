import {
  BodyParams,
  createProtectedHandler,
  httpError,
  httpResponse,
} from '@ag-oss/serverless';
import { config } from '../../config';
import { tokenService } from '../../jwt';
import { verifyEmail } from '@starwars/db';
import { dataModels } from '../../db';

type Body = BodyParams<{ code: string; idToken: string }>;

export const handler = createProtectedHandler<Body>(
  async (event) => {
    const { code, idToken } = event.body;
    try {
      const { email, accountId } = await tokenService.id.verify(idToken);
      console.log(`Attempting to verify email "${email}" with code "${code}"...`);
      await verifyEmail.executor({ accountId, code, email }, dataModels);
      return httpResponse({ userMessage: `Verified email "${email}".` });
    } catch (e) {
      console.log(`Failed to verify email.`);
      console.log(e?.message);
      return httpError('Unable to verify email. Please try again.');
    }
  },
  { secret: config.jwt.accessKey },
);
