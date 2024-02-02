// // import core
// import middy from '@middy/core'; // esm Node v14+
//
// // import some middlewares
// import jsonBodyParser from '@middy/http-json-body-parser';
// import httpErrorHandler from '@middy/http-error-handler';
// import validator from '@middy/validator';
// import { transpileSchema } from '@middy/validator/transpile';
//
// // This is your common handler, in no way different than what you are used to doing every day in AWS Lambda
// const lambdaHandler = async (event, context) => {
//   // we don't need to deserialize the body ourself as a middleware will be used to do that
//   const { creditCardNumber, expiryMonth, expiryYear, cvc, nameOnCard, amount } =
//     event.body;
//
//   // do stuff with this data
//   // ...
//
//   const response = { message: 'payment processed correctly', result: 'success' };
//   return { body: JSON.stringify(response), statusCode: 200 };
// };
//
// // Notice that in the handler you only added base business logic (no deserialization,
// // validation or error handler), we will add the rest with middlewares
//
// const schema = {
//   properties: {
//     body: {
//       properties: {
//         amount: { type: 'number' },
//         creditCardNumber: {
//           maxLength: 19,
//           minLength: 12,
//           pattern: '\\d+',
//           type: 'string',
//         },
//         cvc: { maxLength: 4, minLength: 3, pattern: '\\d+', type: 'string' },
//         expiryMonth: { maximum: 12, minimum: 1, type: 'integer' },
//         expiryYear: { maximum: 2027, minimum: 2017, type: 'integer' },
//         nameOnCard: { type: 'string' },
//       },
//       required: ['creditCardNumber'],
//       type: 'object', // Insert here all required event properties
//     },
//   },
//   type: 'object',
// };
//
// // Let's "middyfy" our handler, then we will be able to attach middlewares to it
// export const handler = middy()
//   .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
//   .use(validator({ eventSchema: transpileSchema(schema) })) // validates the input
//   .use(httpErrorHandler()) // handles common http errors and returns proper responses
//   .handler(lambdaHandler); // applies the handler
