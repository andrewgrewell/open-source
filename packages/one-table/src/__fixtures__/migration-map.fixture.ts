import { testTableSchema } from './schema.fixture';

export const migrationMapFixture = {
  '0.0.1': {
    description: 'test migration 1',
    down: jest.fn(),
    schema: testTableSchema,
    up: jest.fn(),
  },
  '0.0.2': {
    description: 'test migration 2',
    down: jest.fn(),
    schema: testTableSchema,
    up: jest.fn(),
  },
};
