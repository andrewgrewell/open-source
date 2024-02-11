import { createAdminHandler } from '../../utils/create-admin-handler';
import { httpSuccessResponse } from '@ez-api/lambda';

export const handler = createAdminHandler(async () => httpSuccessResponse());
