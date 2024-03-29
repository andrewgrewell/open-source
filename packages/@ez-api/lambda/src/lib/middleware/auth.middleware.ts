import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { verify } from 'jsonwebtoken';
import { Handler, AuthContext, AuthPayload } from '../types';
import { httpErrorResponse } from '../response';
import StatusCode from 'status-code-enum';

export interface AuthMiddlewareOptions {
  authKey?: string;
  allowedRoles?: string[];
}

export function authMiddleware(
  options?: AuthMiddlewareOptions,
): middy.MiddlewareObj<Parameters<Handler<any>>[0], APIGatewayProxyResult> {
  const { authKey, allowedRoles = [] } = options || {};
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request,
  ) => {
    if (!authKey) {
      console.error('authKey is required to use authMiddleware');
      return httpErrorResponse('Service unavailable', {
        statusCode: StatusCode.ServerErrorInternal,
      });
    }
    const authHeader = request.event.headers['Authorization'];
    const token = authHeader?.split(' ')?.[1];
    if (!token) {
      return httpErrorResponse('Missing token', {
        statusCode: StatusCode.ClientErrorUnauthorized,
      });
    }
    try {
      const data = verify(token, authKey);
      if (allowedRoles.length > 0) {
        const role = (data as AuthPayload).role;
        const hasRole = allowedRoles.includes(role);
        if (!hasRole) {
          console.log(
            `Account role ""${role} is not in allowed roles [${allowedRoles.join(',')}]`,
          );
          return httpErrorResponse('Unauthorized', {
            statusCode: StatusCode.ClientErrorUnauthorized,
          });
        }
      }
      (request.context as AuthContext).auth = data as AuthPayload;
      return Promise.resolve();
    } catch (error) {
      console.log('Error verifying token', error);
      return httpErrorResponse('Unable to authenticate request', {
        statusCode: StatusCode.ClientErrorUnauthorized,
      });
    }
  };

  return {
    before,
  };
}
