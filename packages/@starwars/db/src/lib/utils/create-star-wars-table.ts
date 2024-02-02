import { starWarsSchema } from '../schema';
import { CreateTableOptions, StarWarsTable, TableName } from '../types';
import { createOneTable } from '@ag-oss/one-table';

export function createStarWarsTable(options: CreateTableOptions = {}): StarWarsTable {
  const { client, logger } = options;
  return createOneTable({
    client,
    logger,
    name: TableName,
    schema: starWarsSchema,
  });
}
