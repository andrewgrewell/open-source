import { stopContainer } from '@ag-oss/docker';

export interface StopDynamicDbLocalOptions {
  name?: string;
}

export async function stopDynamodbLocal(options?: StopDynamicDbLocalOptions) {
  await stopContainer(options?.name || 'amazon/dynamodb-local');
}
