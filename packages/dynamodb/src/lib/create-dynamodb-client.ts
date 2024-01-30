import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export interface CreateDynamodbClientConfig {
  endpoint: string;
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

export const defaultLocalPort = 8000;

export function createLocalClientConfig(
  port: number = defaultLocalPort,
): CreateDynamodbClientConfig {
  return {
    credentials: {
      accessKeyId: 'local',
      secretAccessKey: 'local',
    },
    endpoint: `http://localhost:${port}`,
    region: 'local',
  };
}

export const createDynamodbClient = (config: CreateDynamodbClientConfig) =>
  new DynamoDBClient(config);
