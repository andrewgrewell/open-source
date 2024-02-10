export interface GetTableModelsOptions {
  table: any;
  schema: any;
}

/**
 * Returns a record of all the models in the table
 * @param options
 */
export function getTableModels(options: GetTableModelsOptions) {
  const { table, schema } = options;
  return Object.keys(schema.models).reduce((acc, modelName) => {
    return {
      ...acc,
      [modelName]: table.getModel(modelName),
    };
  }, {});
}
