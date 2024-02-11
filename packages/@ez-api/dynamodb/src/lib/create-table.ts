import { createOneTable, CreateOneTableOptions } from '@ag-oss/one-table';
import { createLocalClient } from './create-client';

export type CreateTableOptions = CreateOneTableOptions;

export function createTable(options: CreateTableOptions) {
  return createOneTable(options);
}

export interface CreateLocalTableOptions extends Omit<CreateOneTableOptions, 'client'> {
  port?: number;
}

export function createLocalTable(options: CreateLocalTableOptions) {
  const { port, ...restOptions } = options;
  return createOneTable({
    ...restOptions,
    client: createLocalClient(port),
  });
}
