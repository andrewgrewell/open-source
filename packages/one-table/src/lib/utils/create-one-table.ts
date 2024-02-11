import { OneSchema, Table } from 'dynamodb-onetable';
import { oneTableCrypto } from './crypto';

export interface CreateOneTableOptions {
  name: string;
  schema: OneSchema;
  client?: object;
  log?: boolean;
}

export function createOneTable(options: CreateOneTableOptions): Table<OneSchema> {
  const { name, schema, client, log } = options;
  //  Crypto setup to add additional encryption layer
  //  TODO: this should be optional as it could be redundant depending on the db provider
  if (!oneTableCrypto.primary.password || !oneTableCrypto.primary.cipher) {
    throw new Error(
      'oneTableCrypto not initialized, ensure the primary password and cipher are set on the environment.',
    );
  }
  return new Table({
    client,
    crypto: oneTableCrypto,
    logger: log,
    name,
    partial: true,
    schema,
  });
}
