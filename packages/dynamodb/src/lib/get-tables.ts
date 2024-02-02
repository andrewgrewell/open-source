import { CreateDynamodbClientConfig } from './create-dynamodb-client';
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { verboseLogger as log } from '@ag-oss/logging';

interface GetTablesOptions {
  clientConfig: CreateDynamodbClientConfig;
  limit?: number;
}
export async function getTables(options: GetTablesOptions) {
  log.verbose(`Creating client with config: ${JSON.stringify(options.clientConfig)}`);
  const client = new DynamoDBClient(options.clientConfig);
  const result = await client.send(
    new ListTablesCommand({
      Limit: options.limit || 100,
    }),
  );
  return result.TableNames;
}
