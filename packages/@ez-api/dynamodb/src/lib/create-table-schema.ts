import { TableSchema } from './types';

interface CreateTableSchemaOptions {
  /**
   * semver version e.g. 0.0.1
   */
  version: string;
  models: TableSchema['models'];
}

export function createTableSchema(options: CreateTableSchemaOptions): TableSchema {
  const { models = {}, version } = options;
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
