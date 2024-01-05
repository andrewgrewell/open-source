export interface StayAwakeResult {
  done: () => void;
  promise: Promise<void>;
}

export function stayAwake(): StayAwakeResult {
  let result: StayAwakeResult = {
    done: () => {
      // noop
    },
    promise: Promise.resolve(),
  };
  const promise = new Promise<void>((resolve) => {
    result = { done: resolve, promise: Promise.resolve() };
  });
  result.promise = promise;
  return result;
}
