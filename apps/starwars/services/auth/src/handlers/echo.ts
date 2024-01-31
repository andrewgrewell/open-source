import {
  BodyParams,
  createProtectedHandler,
  httpError,
  httpResponse,
} from '@ag-oss/serverless';

type Params = BodyParams<{ title: string }>;

export const handler = createProtectedHandler<Params>(
  async (event, context) => {
    try {
      return httpResponse({
        data: { context, eventBody: event.body },
      });
    } catch (e) {
      return httpError(e);
    }
  },
  { secret: 'secret' },
);

// export const handler = async (event, context) => {
//   try {
//     return {
//       body: JSON.stringify({ context, eventBody: event.body }),
//       statusCode: 200,
//     };
//   } catch (e) {
//     return {
//       body: JSON.stringify({ error: e }),
//       statusCode: 500,
//     };
//   }
// };
