import { BaseSchema, ValidationError } from 'yup';
import middy from '@middy/core';
import { APIGatewayProxyResult } from 'aws-lambda';
import { httpError } from '../response';
import { BodyParams, EventParams, Handler, QueryParams } from '../types';

export function schemaValidator<P extends EventParams>(schema: {
  body?: BaseSchema<P extends BodyParams ? P['body'] : never>;
  queryStringParameters?: BaseSchema<
    BaseSchema<P extends QueryParams ? P['queryStringParameters'] : never>
  >;
}): middy.MiddlewareObj<Parameters<Handler<P>>[0], APIGatewayProxyResult> {
  const before: middy.MiddlewareFn<
    Parameters<Handler<P>>[0],
    APIGatewayProxyResult
  > = async (request) => {
    try {
      const { body, queryStringParameters } = request.event;

      if (schema.body) {
        schema.body.validateSync(body);
      }

      if (schema.queryStringParameters) {
        schema.queryStringParameters.validateSync(queryStringParameters ?? {});
      }

      return Promise.resolve();
    } catch (e) {
      const errorMessage =
        e instanceof ValidationError
          ? 'Validation error: ' + e.errors.map((err) => err).join(', ')
          : 'Validation error';
      return httpError(errorMessage);
    }
  };

  return {
    before,
  };
}
