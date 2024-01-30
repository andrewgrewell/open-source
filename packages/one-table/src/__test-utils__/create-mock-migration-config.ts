import { testTableSchema } from '../__fixtures__/schema.fixture';

export function createMockMigrationConfig(
  version = '0.0.1',
  description = 'test migration',
) {
  return {
    description,
    down: jest.fn(),
    schema: testTableSchema,
    up: jest.fn(),
    version,
  };
}
