import { createOneTableClient } from '@ag-oss/one-table';
import { CreateDynamodbClientConfig, createLocalClientConfig } from '@ag-oss/dynamodb';

export function createClient(options: CreateDynamodbClientConfig) {
  return createOneTableClient(options);
}

/**
 * Create a local client using dynamodb defaults
 * @param port
 */
export function createLocalClient(port?: number) {
  return createOneTableClient(createLocalClientConfig(port));
}
