import { AuthModels, AuthTable, authTableSchema } from '../table';

/**
 * Utility for returning all auth models
 * @param table
 */
export function getAuthModels(table: AuthTable): AuthModels {
  return Object.keys(authTableSchema.models).reduce((acc, modelName) => {
    return {
      ...acc,
      [modelName]: table.getModel(modelName as keyof AuthModels),
    };
  }, {} as AuthModels);
}
