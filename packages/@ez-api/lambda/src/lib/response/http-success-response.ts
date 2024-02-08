import { APIGatewayProxyResult } from 'aws-lambda';
import {
  createSuccessBody,
  defaultCorsHeaders,
  defaultSuccessStatusCode,
} from '@ez-api/core';

export type HttpSuccessResponseOptions = Omit<APIGatewayProxyResult, 'body'> & {
  statusCode: number;
};

/**
 * Utility for returning consistent success responses in lambda handlers
 * @param data
 * @param options
 */
export function httpSuccessResponse(
  data?: Record<string, unknown>,
  options?: HttpSuccessResponseOptions,
): APIGatewayProxyResult {
  const { statusCode, ...rest } = options || { statusCode: defaultSuccessStatusCode };
  return {
    body: JSON.stringify(createSuccessBody({ data, statusCode })),
    statusCode,
    ...rest,
    headers: {
      ...rest.headers,
      ...defaultCorsHeaders,
    },
  };
}
