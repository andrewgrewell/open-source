import StatusCode from 'status-code-enum';
import { ResponseBody, UnknownResponseBody } from './types';

export const defaultSuccessStatusCode = StatusCode.SuccessOK;

export interface CreateSuccessBodyOptions {
  data?: Record<string, unknown>;
  statusCode?: number;
}

export function createSuccessBody<
  TData extends UnknownResponseBody = UnknownResponseBody,
>(options?: CreateSuccessBodyOptions): ResponseBody<TData> {
  const { data = {}, statusCode = defaultSuccessStatusCode } = options || {
    data: {},
    statusCode: defaultSuccessStatusCode,
  };
  return {
    data,
    ok: true,
    statusCode,
  } as ResponseBody<TData>;
}
