import { createTableSchema, Table } from '@ez-api/dynamodb';
import { AuthModels, authTableSchema } from '@ez-api/auth';

export const tableName = 'StarWarsTable';

export type StarWarsModels = AuthModels;
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

export type StarWarsSchemaModels = typeof starWarsTableSchema.models;

export type StarWarsTableSchema = typeof starWarsTableSchema;

export type StarWarsTable = Table<StarWarsTableSchema, StarWarsSchemaModels>;
