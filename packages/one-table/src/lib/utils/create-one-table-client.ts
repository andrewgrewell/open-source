/* istanbul ignore file */
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { CreateDynamodbClientConfig } from '@bridge/node-dynamodb';
import Dynamo from 'dynamodb-onetable/Dynamo';

export const createOneTableClient = (config: CreateDynamodbClientConfig) =>
  new Dynamo({
    client: new DynamoDBClient(config),
  });
