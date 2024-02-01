import {
  BodyParams,
  createProtectedHandler,
  httpError,
  httpResponse,
} from '@ag-oss/serverless';

type Params = BodyParams<{ title: string }>;

export const description = 'Debug handler for validating setup';

export const events = [
  {
    http: {
      method: 'POST',
      path: 'echo',
    },
  },
];

export const handler = createProtectedHandler<Params>(async (event, context) => {
  try {
    return httpResponse({
      data: { context, eventBody: event.body },
    });
  } catch (e) {
    return httpError(e);
  }
});
