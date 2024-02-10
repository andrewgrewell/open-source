import { createLocalTable, createTable } from '@ez-api/dynamodb';
import { StarWarsTable, starWarsTableSchema, tableName } from './schema';

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
  });
}

export interface CreateLocalStarWarsTableOptions
  extends Omit<CreateStarWarsTableOptions, 'client'> {
  port?: number;
}

export function createLocalStarWarsTable(
  options: CreateStarWarsTableOptions & { port: number },
): StarWarsTable {
  return createLocalTable({
    ...options,
    name: tableName,
    schema: starWarsTableSchema,
  });
}
