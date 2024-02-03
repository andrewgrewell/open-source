import {
  BodyParams,
  createProtectedHandler,
  httpError,
  httpResponse,
} from '@ag-oss/serverless';

type Params = BodyParams<{ title: string }>;

export const handler = createProtectedHandler<Params>(async (event, context) => {
  try {
    return httpResponse({
      data: { context, eventBody: event.body },
    });
  } catch (e) {
    return httpError(e);
  }
});
