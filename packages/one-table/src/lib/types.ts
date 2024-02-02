import { OneSchema } from 'dynamodb-onetable';

export type MigrateInstance = Record<string, unknown>;

export type MigrationParams = {
  dry?: boolean;
} & Record<string, unknown>;

export type MigrationFn<TableType> = (
  db: TableType,
  migrate: MigrateInstance,
  params: MigrationParams,
) => Promise<void>;

export interface MigrationConfig<TableType> {
  version: string;
  description: string;
  schema: OneSchema;
  up: MigrationFn<TableType>;
  down: MigrationFn<TableType>;
}

export interface MigrationImplContext<TableType> {
  db: TableType; // On dry-runs this is a proxy, and any models are proxies
  migrate: MigrateInstance;
  params: MigrationParams;
  dryLog: (message: string) => void;
}

export type MigrationImplementation<TableType> = (
  context: MigrationImplContext<TableType>,
) => void;

export interface CreateMigrationConfig<TableType>
  extends Omit<MigrationConfig<TableType>, 'up' | 'down'> {
  up: MigrationImplementation<TableType>;
  down: MigrationImplementation<TableType>;
}

export type MigrationsConfigMap<TableType> = Record<
  string,
  Omit<CreateMigrationConfig<TableType>, 'version'>
>;

export interface MigrationsControllerConfig<TableType> {
  tableName: string;
  migrations: MigrationsConfigMap<TableType>;
}

export type AccessPatternExecutor = (...args: any[]) => Promise<unknown>;

export interface ParamConfig {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object';
  params?: ParamConfig[];
}

export interface AccessPatternConfig {
  params: ParamConfig[];
  executor: AccessPatternExecutor;
  name: string;
}
