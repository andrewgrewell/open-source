import StatusCode from 'status-code-enum';
import { ResponseBody, UnknownResponseBody } from './types';

export const defaultErrorStatusCode = StatusCode.ClientErrorBadRequest;

export interface CreateErrorBodyOptions {
  statusCode: number;
  errorCode?: string;
  error: Error | string;
  data: Record<string, unknown>;
}

export function createErrorBody<TData extends UnknownResponseBody = UnknownResponseBody>(
  options: CreateErrorBodyOptions,
): ResponseBody<TData> {
  const {
    data = {},
    statusCode = defaultErrorStatusCode,
    errorCode,
    error,
  } = options || {
    data: {},
    statusCode: defaultErrorStatusCode,
  };
  const errorMessage = typeof error === 'string' ? error : (error as Error).message;
  const errorObject = typeof error !== 'string' ? error : undefined;
  return {
    data,
    error: errorObject,
    errorCode,
    errorMessage,
    ok: false,
    statusCode,
  } as ResponseBody<TData>;
}
