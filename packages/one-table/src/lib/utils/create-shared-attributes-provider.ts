import { OneModel, OneSchema } from 'dynamodb-onetable';

type SchemaModels = OneSchema['models'];

export function createSharedAttributesProvider<TSharedAttributes extends OneModel>(
  sharedAttributes: TSharedAttributes,
) {
  function withSharedAttributes<T extends SchemaModels>(schema: T) {
    return (Object.entries(schema) as [string, OneModel & TSharedAttributes][]).reduce(
      (acc, [modelName, modelSchema]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc[modelName] = {
          ...sharedAttributes,
          ...modelSchema,
        };
        return acc;
      },
      {} as T & { [K in keyof T]: T[K] & TSharedAttributes },
    );
  }
  return withSharedAttributes;
}
