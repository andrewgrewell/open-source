export function createMockObject<TModel extends object>() {
  const traps: Record<keyof TModel, jest.MockedFn<any>> = {} as any;
  const model = new Proxy(
    {},
    {
      get: (target, prop) => {
        if (!traps[prop as keyof TModel]) {
          traps[prop as keyof TModel] = jest.fn();
        }
        return traps[prop as keyof TModel];
      },
    },
  ) as TModel;
  return {
    model,
    traps,
  };
}
