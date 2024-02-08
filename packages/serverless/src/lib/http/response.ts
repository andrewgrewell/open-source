import { APIGatewayProxyResult } from 'aws-lambda';
import StatusCode from 'status-code-enum';

// TODO setup CORS
const defaultCorsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Max-Age': 86400,
};

export function httpResponse(
  data: Record<string, unknown>,
  { statusCode = 200, ...rest }: Omit<APIGatewayProxyResult, 'body'> = {
    statusCode: 200,
  },
): APIGatewayProxyResult {
  return {
    body: JSON.stringify({ data, ok: true }),
    statusCode,
    ...rest,
    headers: {
      ...rest.headers,
      ...defaultCorsHeaders,
    },
  };
}

export type HttpErrorOptions = Omit<APIGatewayProxyResult, 'body'> & {
  statusCode: number;
  data: Record<string, unknown>;
};

export function httpError(
  error: Error | string,
  options: HttpErrorOptions,
): APIGatewayProxyResult {
  const { data, statusCode, ...restOptions } = options || {
    data: {},
    statusCode: StatusCode.ServerErrorInternal,
  };
  const errorMessage = typeof error === 'string' ? error : (error as Error).message;
  const errorObject = typeof error !== 'string' ? error : undefined;
  return {
    body: JSON.stringify({ data, error: errorObject, errorMessage, ok: false }),
    statusCode,
    ...restOptions,
    headers: {
      ...restOptions.headers,
      ...defaultCorsHeaders,
    },
  };
}
