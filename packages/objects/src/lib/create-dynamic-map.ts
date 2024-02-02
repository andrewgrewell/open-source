export type DynamicMap<T> = {
  [K in keyof T]: T[K];
} & {
  [Symbol.iterator](): IterableIterator<[keyof T, T[keyof T]]>;
} & { [key: string]: T[keyof T] };

type DefaultValueBuilder<TMap> = (key: string | symbol) => TMap[keyof TMap] | undefined;

export interface CreateDynamicMapOptions {
  freeze?: boolean;
  testId?: string;
}

export function createDynamicMap<TMap extends Record<string, unknown>>(
  defaultValueBuilder: DefaultValueBuilder<TMap>,
  options: CreateDynamicMapOptions = {},
): DynamicMap<TMap> {
  const { freeze } = options;
  const baseMap = new Map();
  const proxyBase = freeze ? Object.freeze({}) : {};
  return new Proxy(proxyBase, {
    get: (target, key: string | symbol) => {
      if (key === '__testId__') {
        return options.testId;
      }
      if (key === Symbol.iterator) {
        return baseMap[Symbol.iterator].bind(baseMap);
      }
      if (baseMap.get(key)) {
        return baseMap.get(key);
      } else {
        const defaultValue = defaultValueBuilder(key);
        baseMap.set(key, defaultValue);
        return defaultValue;
      }
    },
    set: (target, key: string | symbol, value: unknown) => {
      if (freeze) {
        throw new Error(
          `Cannot define property ${String(key)}, object is not extensible`,
        );
      }
      baseMap.set(key, value);
      return true;
    },
  }) as DynamicMap<TMap>;
}
