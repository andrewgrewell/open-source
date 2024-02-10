import { Table, TableSchema } from './types';

export interface GetTableModelsOptions<TTable extends Table<TableSchema>> {
  table: TTable;
  schema: TableSchema;
}

/**
 * Returns a record of all the models in the table
 * @param options
 */
export function getTableModels<TTable extends Table<TableSchema>>(
  options: GetTableModelsOptions<TTable>,
) {
  const { table, schema } = options;
  return Object.keys(schema.models).reduce((acc, modelName) => {
    return {
      ...acc,
      [modelName]: table.getModel(modelName),
    };
  }, {});
}
