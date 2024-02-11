export type UnknownResponseBody = Record<string, unknown>;

export interface ResponseBody<TData extends UnknownResponseBody = UnknownResponseBody> {
  data: TData;
  ok: boolean;
  error?: Error;
  errorMessage?: string;
  errorCode?: string;
}
