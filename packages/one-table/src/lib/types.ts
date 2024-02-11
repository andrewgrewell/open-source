import { OneSchema, Table } from 'dynamodb-onetable';

export type MigrateInstance = Record<string, unknown>;

export type MigrationParams = {
  dry?: boolean;
} & Record<string, unknown>;

export type MigrationFn = (
  Table: Table,
  migrate: MigrateInstance,
  params: MigrationParams,
) => Promise<void>;

export interface MigrationConfig {
  version: string;
  description: string;
  schema: OneSchema;
  up: MigrationFn;
  down: MigrationFn;
}

export interface MigrationImplContext<TTable extends Table> {
  Table: TTable; // On dry-runs this is a proxy, and any models are proxies
  migrate: MigrateInstance;
  params: MigrationParams;
  dryLog: (message: string) => void;
}

export type MigrationImplementation<TTable extends Table> = (
  context: MigrationImplContext<TTable>,
) => Promise<void> | void;

export interface CreateMigrationConfig<TTable extends Table>
  extends Omit<MigrationConfig, 'up' | 'down'> {
  up: MigrationImplementation<TTable>;
  down: MigrationImplementation<TTable>;
}

export type MigrationsConfigMap<TTable extends Table = Table> = Record<
  string,
  Omit<CreateMigrationConfig<TTable>, 'version'>
>;

export interface MigrationsControllerConfig<TTable extends Table> {
  crypto?: {
    primary: {
      password: string;
      cipher: string;
    };
  };
  tableName: string;
  migrations: MigrationsConfigMap<TTable>;
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
