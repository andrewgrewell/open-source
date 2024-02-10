import { MigrationsControllerConfig } from '@ag-oss/one-table';
import { BasicRole } from '@ez-api/core';
import { getTableModels } from '@ez-api/dynamodb';
import { createAccount, verifyEmail } from '@ez-api/auth';
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
        const tableModels = getTableModels({ schema: starWarsTableSchema, table: db });
        console.log('Adding admin account');
        const { account, passcode } = await createAccount.executor(
          {
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: BasicRole.Admin,
          },
          tableModels,
        );
        console.log('Auto verifying admin account email.');
        await verifyEmail.executor(
          {
            accountId: account.id,
            code: passcode,
            email: account.email,
          },
          tableModels,
        );
      },
    },
  },
  tableName,
};
