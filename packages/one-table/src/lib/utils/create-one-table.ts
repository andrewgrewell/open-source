//  Crypto setup for to add additional encryption layer of email addresses
import { oneTableCrypto } from './crypto';
import { OneSchema, Table } from 'dynamodb-onetable';

export interface CreateTableOptions {
  name: string;
  schema: OneSchema;
  client?: object;
  logger?: boolean;
}

export function createOneTable(options: CreateTableOptions): Table<OneSchema> {
  const { name, schema, client, logger } = options;
  return new Table({
    client,
    crypto: oneTableCrypto,
    logger,
    name,
    partial: true,
    schema,
  });
}
