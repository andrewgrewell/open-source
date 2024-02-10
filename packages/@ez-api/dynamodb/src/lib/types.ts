import { OneSchema, Table as OneTable, OneModel, Model } from 'dynamodb-onetable';

export type SchemaModels = Record<string, OneModel>;

export type ExecutorModels = Record<string, Model<any>>;

/**
 * The schema (OneSchema) for a table
 * Note: OneSchema is not strongly typed, so we define the type better here.
 */
export type TableSchema<TModels extends SchemaModels> = Omit<OneSchema, 'models'> & {
  models: TModels;
};

/**
 * A table (OneTable) instance
 */
export type Table<
  TSchema extends TableSchema<TModels>,
  TModels extends SchemaModels,
> = OneTable<TSchema> & { models: TModels };

/**
 * Options that are passed into all procedure executors to provide them access to the db table and models in addition
 * to the other options that executor needs to perform its operation.
 */
export type ProcedureExecutorOptions<
  TTable extends OneTable,
  TModels extends ExecutorModels,
  TExecutorOptions extends Record<string, unknown> = Record<string, unknown>,
> = TModels &
  TExecutorOptions & {
    Table: TTable;
  };

/**
 * A procedure executor is a function that encapsulates business logic and is provided access to a database table and models.
 */
export type ProcedureExecutor<
  TTable extends OneTable,
  TModels extends ExecutorModels,
  TExecutorReturn = unknown,
  TExecutorOptions extends Record<string, unknown> = Record<string, unknown>,
> = (
  options: ProcedureExecutorOptions<TTable, TModels, TExecutorOptions>,
) => TExecutorReturn;

/**
 * Define the parameters that a procedure takes, this provides better output for dry runs
 * and allows for procedures to be run in a REPL.
 * In the future the types for the parameters will be used instead of requiring explicit definition
 */
export type ProcedureParam = {
  name: string;
  type: 'string' | 'object';
  params?: ProcedureParam[];
};

/**
 * A procedure definition that includes the executor and the parameters that the executor takes
 * This is used to provide better output for dry runs and allows for procedures to be run in a REPL.
 */
export interface ProcedureDefinition<
  TTable extends OneTable,
  TModels extends ExecutorModels,
  TExecutorReturn = unknown,
  TExecutorOptions extends Record<any, unknown> = Record<any, unknown>,
> {
  executor: ProcedureExecutor<TTable, TModels, TExecutorReturn, TExecutorOptions>;
  params: ProcedureParam[];
}
