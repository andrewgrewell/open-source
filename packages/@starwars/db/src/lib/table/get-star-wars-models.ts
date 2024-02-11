import { StarWarsTable, StarWarsModels, starWarsTableSchema } from './star-wars.schema';

/**
 * Utility for returning all StarWars models
 * @param table
 */
export function getStarWarsModels(table: StarWarsTable): StarWarsModels {
  return Object.keys(starWarsTableSchema.models).reduce((acc, modelName) => {
    return {
      ...acc,
      [modelName]: table.getModel(modelName as keyof StarWarsModels),
    };
  }, {} as StarWarsModels);
}
