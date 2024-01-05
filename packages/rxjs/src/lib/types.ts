import { Observable, Subject } from 'rxjs';

export interface Logger {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  trace: (...args: unknown[]) => void;
}

export type RxService = { [key: string]: unknown };

export type ObservableServiceMap<TServiceMap extends ServiceMap = ServiceMap> = {
  [K in keyof TServiceMap]: Observable<TServiceMap[K]>;
};

export type ServiceCreatorOptions<
  TServices extends ServiceMap = ServiceMap,
  TServiceOptions extends Record<string, unknown> = Record<string, unknown>,
> = {
  logger?: Logger;
  services: ObservableServiceMap<TServices>;
} & {
  [key in keyof TServiceOptions]: TServiceOptions[keyof TServiceOptions];
};

export type ServiceMap<T extends Record<string, RxService> = Record<string, RxService>> =
  {
    [K in keyof T]: T[K];
  };

/**
 * A `ServiceCreator` is a function which returns a `RxService`.
 * - TServiceMap type is required to type the object that is passed to the creator
 * - TService type is required to type the return value of the creator
 */
export type ServiceCreator<
  TServiceMap extends ServiceMap = ServiceMap,
  TService extends RxService = RxService,
> = (options: ServiceCreatorOptions<TServiceMap>) => TService;

export type ServiceCreatorMap<TServiceMap extends ServiceMap = ServiceMap> = {
  [K in keyof TServiceMap]: ServiceCreator<TServiceMap> | undefined;
};

/**
 * A modifier is a function which receives the output stream and returns a new stream.
 * This is useful for cases where the input maps to different output
 */
export type RxActionOutputModifier<TInput = any, TOutput = TInput> = (
  input: Observable<TInput>,
) => Observable<TOutput>;

export interface CreateRxActionOptions<TInput = any, TOutput = TInput> {
  /**
   * If provided will use a BehaviorSubject instead of Subject for the stream.
   * If `defaultValue` is an Observable, the `defaultValue` will be used, until the action stream emits.
   * @note: `null` values will be ignored on the action stream when `defaultValue` is an Observable
   */
  defaultValue?: TOutput | Observable<TOutput>;
  /**
   * A modifier is a function which receives the input stream and returns a new stream.
   * This allows for input values to drive different output
   */
  outputModifier?: RxActionOutputModifier<TInput, TOutput>;
}

/**
 * An RxAction is an object which can be used to trigger or subscribe to data.
 * TInputData can optionally be provided for cases were the input is modified
 * before being emitted on the stream
 */
export type RxAction<TInput = unknown, TOutput = TInput> = {
  trigger: Subject<TInput>;
  output: Observable<TOutput>;
};

/**
 * A useful pattern for making Actions easier to work with in operators is to add the latest value
 * onto the action object.
 */
export type RxActionSync<TData = unknown> = {
  value: TData | null;
} & RxAction<TData>;
