/// <reference types="node" />

export interface CreateMockMigrateInstanceConfig {
  currentVersion?: string;
  pastMigrations?: unknown[];
  migrations?: unknown[];
}
export function createMockMigrateInstance(config: CreateMockMigrateInstanceConfig) {
  const mockMigrateInstance = {
    apply: jest.fn(),
    findPastMigrations: jest.fn(),
    getCurrentVersion: jest.fn(() => config?.currentVersion ?? '0.0.0'),
    getOutstandingMigrations: jest.fn(),
    init: jest.fn(),
    setVersion: jest.fn(),
  };
  return mockMigrateInstance;
}
