import { MigrationsControllerConfig } from '@ag-oss/one-table';
import { BasicRole, createAccount, getAuthModels, verifyEmail } from '@ez-api/auth';
import { StarWarsTable, starWarsTableSchema, tableName } from '../table';

export const starWarsMigrationsConfig: MigrationsControllerConfig<StarWarsTable> = {
  migrations: {
    '0.0.1': {
      description: 'Initialize DB',
      down: () => {
        // no use case for down on the first migration, but it could reset the DB
      },
      schema: starWarsTableSchema,
      up: async ({ Table }) => {
        const authModels = getAuthModels(Table);
        console.log('Adding admin account');
        const { account, verifyCode } = await createAccount({
          Table,
          ...authModels,
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          role: BasicRole.Admin,
        });
        console.log('Auto verifying admin account email.');
        await verifyEmail({
          Table,
          ...authModels,
          accountId: account.id,
          code: verifyCode,
          email: account.email,
        });
      },
    },
  },
  tableName,
};
