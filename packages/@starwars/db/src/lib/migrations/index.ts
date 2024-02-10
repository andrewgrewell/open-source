import { MigrationsControllerConfig } from '@ag-oss/one-table';
import { BasicRole } from '@ez-api/core';
import { createAccount, getAuthModels, verifyEmail } from '@ez-api/auth';
import { StarWarsTable, starWarsTableSchema, tableName } from '../table';

export const starWarsMigrationsConfig: MigrationsControllerConfig<StarWarsTable> = {
  migrations: {
    '0.0.1': {
      description: 'Initialize DB',
      down: () => {
        // no use case for down on the first migration, but it could reset the DB
      },
      schema: starWarsTableSchema,
      up: async ({ db }) => {
        const authModels = getAuthModels(db);
        console.log('Adding admin account');
        const { account, passcode } = await createAccount({
          Table: db,
          ...authModels,
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          role: BasicRole.Admin,
        });
        console.log('Auto verifying admin account email.');
        await verifyEmail({
          Table: db,
          ...authModels,
          accountId: account.id,
          code: passcode,
          email: account.email,
        });
      },
    },
  },
  tableName,
};
