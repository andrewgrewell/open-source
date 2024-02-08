import { APIGatewayProxyResult } from 'aws-lambda';
import {
  createErrorBody,
  defaultCorsHeaders,
  defaultErrorStatusCode,
} from '@ez-api/core';

export type HttpErrorOptions = Omit<APIGatewayProxyResult, 'statusCode' | 'body'> & {
  statusCode?: number;
  // TODO we'll want to support passing in application specific errorCode
  errorCode?: string;
  data?: Record<string, unknown>;
};

export function httpErrorResponse(
  error: Error | string,
  options?: HttpErrorOptions,
): APIGatewayProxyResult {
  const {
    data = {},
    statusCode = defaultErrorStatusCode,
    errorCode,
    ...restOptions
  } = options || {
    data: {},
    statusCode: defaultErrorStatusCode,
  };
  return {
    body: JSON.stringify(createErrorBody({ data, error, errorCode, statusCode })),
    statusCode,
    ...restOptions,
    headers: {
      ...restOptions.headers,
      ...defaultCorsHeaders,
    },
  };
}
