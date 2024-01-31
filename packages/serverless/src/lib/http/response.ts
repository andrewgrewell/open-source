import { APIGatewayProxyResult } from 'aws-lambda';

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
    body: JSON.stringify({ data }),
    statusCode,
    ...rest,
    headers: {
      ...rest.headers,
      ...defaultCorsHeaders,
    },
  };
}

export function httpError(
  error: unknown,
  { statusCode = 400, ...rest }: Omit<APIGatewayProxyResult, 'body'> = {
    statusCode: 200,
  },
): APIGatewayProxyResult {
  return {
    body: JSON.stringify({ error }),
    statusCode,
    ...rest,
    headers: {
      ...rest.headers,
      ...defaultCorsHeaders,
    },
  };
}
