import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
} from 'aws-lambda';
import { MiddlewareObj } from '@middy/core';
import { Method, Route } from '@middy/http-router';

export interface BodyParams<T extends Record<string, unknown> = Record<string, unknown>> {
  body: T;
}

export interface QueryParams<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  queryStringParameters: T;
}

export interface PathParams<T extends Record<string, unknown> = Record<string, unknown>> {
  pathParameters: T;
}

export type EventParams = BodyParams | QueryParams | PathParams;

export type Handler<P extends EventParams, isProtected extends boolean = true> = (
  event: Omit<
    APIGatewayProxyEvent,
    'body' | 'pathParameters' | 'queryStringParameters'
  > & {
    body: P extends BodyParams ? P['body'] : null;
    pathParameters: P extends PathParams ? P['pathParameters'] : null;
    queryStringParameters: P extends QueryParams ? P['queryStringParameters'] : null;
  },
  context: isProtected extends true ? Context & AuthContext : Context,
  callback: Callback<APIGatewayProxyResult>,
) => void | Promise<APIGatewayProxyResult>;

export type AuthPayload = {
  accountId: string;
  email: string;
  roles?: string[];
  iat: number;
  aud: string;
  iss: string;
  sub: string;
  jti: string;
};

export type AuthContext = Context & {
  auth: AuthPayload;
};

export type MiddyMiddleware = MiddlewareObj;
export type MiddyRoute = Route<unknown>;
export interface RouterRoute {
  handler: Handler<any>;
  method: Method;
  path: string;
}
