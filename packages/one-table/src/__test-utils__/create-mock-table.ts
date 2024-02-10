/// <reference types="jest" />

import { Table } from 'dynamodb-onetable';

export const TABLE_METHOD_NAMES = [
  'createTable',
  'exists',
  'getModel',
  'deleteTable',
] as const;

export type MockTableMethodName = (typeof TABLE_METHOD_NAMES)[number];

export function createMockTable() {
  const mockTable: Record<MockTableMethodName, jest.MockedFn<jest.Mock>> = {
    createTable: jest.fn(),
    deleteTable: jest.fn(),
    exists: jest.fn(),
    getModel: jest.fn(),
  };
  return mockTable as never as jest.Mocked<Table>;
}
