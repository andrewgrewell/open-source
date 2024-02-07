import { createProtectedHandler, httpResponse } from '@ag-oss/serverless';

import { config } from '../../config';

export const handler = createProtectedHandler(
  async (event) => {
    return httpResponse({ message: 'OK' });
  },
  { secret: config.jwt.adminKey },
);
