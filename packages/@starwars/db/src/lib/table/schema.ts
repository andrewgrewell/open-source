import { createTableSchema, Table } from '@ez-api/dynamodb';
import { authTableSchema } from '@ez-api/auth';

export const tableName = 'StarWarsTable';

/**
 * The schema for the StarWarsTable. The table follows "OneTable" patterns.
 */
export const starWarsTableSchema = createTableSchema({
  models: {
    ...authTableSchema.models,
    // TODO StarWars specific models
  },
  version: '0.0.1',
} as const);

export type StarWarsTableSchema = typeof starWarsTableSchema;

export type StarWarsTable = Table<StarWarsTableSchema>;
