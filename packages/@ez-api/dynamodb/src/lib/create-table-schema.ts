import { SchemaModels, TableSchema } from './types';

interface CreateTableSchemaOptions<TModels extends SchemaModels> {
  /**
   * semver version e.g. 0.0.1
   */
  version: string;
  models: TableSchema<TModels>['models'];
}

export function createTableSchema<TModels extends SchemaModels>(
  options: CreateTableSchemaOptions<TModels>,
): TableSchema<TModels> {
  const { models = {} as TModels, version } = options;
  return {
    indexes: {
      gs1: { hash: 'gs1pk', project: ['gs1pk', 'gs1sk'], sort: 'gs1sk' },
      primary: { hash: 'pk', sort: 'sk' },
    },
    models,
    params: {
      isoDates: true,
      timestamps: true,
    },
    version,
  } as const;
}
