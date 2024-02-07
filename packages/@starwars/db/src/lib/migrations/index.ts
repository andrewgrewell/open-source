import { createAccount } from '../access-patterns';
import { starWarsSchema } from '../schema';
import { StarWarsTable, TableName } from '../types';
import { createStarWarsModels } from '../utils/create-star-wars-models';
import { MigrationsControllerConfig } from '@ag-oss/one-table';

export const starWarsMigrationsConfig: MigrationsControllerConfig<StarWarsTable> = {
  migrations: {
    '0.0.1': {
      description: 'Initialize DB',
      down: () => {
        // no use case for down on the first migration, but it could reset the DB
      },
      schema: starWarsSchema,
      up: async ({ db }) => {
        const tableModels = createStarWarsModels(db);
        await createAccount.executor(
          {
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
          },
          tableModels,
        );
      },
    },
  },
  tableName: TableName,
};
