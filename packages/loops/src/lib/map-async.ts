export type AsyncMapper<TData, TReturn> = (
  value: TData,
  index: number,
  array: TData[],
) => Promise<TReturn>;

export async function mapAsync<TData, TReturn = unknown>(
  data: TData[],
  mapper: AsyncMapper<TData, TReturn>,
): Promise<TReturn[]> {
  const result = [];
  for (let i = 0; i < (data?.length || 0); i++) {
    const item = data[i];
    const mapped = await mapper(item, i, data);
    result.push(mapped);
  }
  return result;
}
