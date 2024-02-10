import { AuthProcedureExecutor } from '@ez-api/auth';
import { StarWarsModels } from '@starwars/db';
import { models, Table } from '../db';

type ExecuteOptions<TProcedure extends AuthProcedureExecutor<any, any>> = Omit<
  Parameters<TProcedure>[0],
  'Table' | keyof StarWarsModels
>;

/**
 * Utility that makes it a little cleaner to execute a procedure, by providing the Table and models.
 * @param procedure
 * @param options
 */
export function execute<TProcedure extends AuthProcedureExecutor<any, any>>(
  procedure: TProcedure,
  options: ExecuteOptions<TProcedure>,
) {
  return procedure({
    Table,
    ...models,
    ...options,
  }) as ReturnType<TProcedure>;
}
