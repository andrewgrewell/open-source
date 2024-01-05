export type AsyncReducer<TData, TInitialValue> = (
  acc: TInitialValue,
  value: TData,
  index: number,
  array: TData[],
) => Promise<TInitialValue>;

export async function reduceAsync<TData, TInitialValue>(
  data: TData[],
  reducer: AsyncReducer<TData, TInitialValue>,
  initialValue: TInitialValue,
): Promise<TInitialValue> {
  let acc = initialValue;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    acc = await reducer(acc, item, i, data);
  }
  return acc;
}
