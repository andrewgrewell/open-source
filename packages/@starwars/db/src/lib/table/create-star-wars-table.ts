import { createLocalTable, createTable } from '@ez-api/dynamodb';
import { StarWarsTable, starWarsTableSchema, tableName } from './star-wars.schema';

export interface CreateStarWarsTableOptions {
  client: object;
  log?: boolean;
}

export function createStarWarsTable(options: CreateStarWarsTableOptions): StarWarsTable {
  const { client, log } = options;
  return createTable({
    client,
    log,
    name: tableName,
    schema: starWarsTableSchema,
  }) as unknown as StarWarsTable;
}

export interface CreateLocalStarWarsTableOptions
  extends Omit<CreateStarWarsTableOptions, 'client'> {
  port?: number;
}

export function createLocalStarWarsTable(
  options: CreateLocalStarWarsTableOptions,
): StarWarsTable {
  return createLocalTable({
    ...options,
    name: tableName,
    schema: starWarsTableSchema,
  }) as unknown as StarWarsTable;
}
