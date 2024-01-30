import { migrationMapFixture } from '../../../__fixtures__/migration-map.fixture';
import { testTableSchema } from '../../../__fixtures__/schema.fixture';
import { createMockTable } from '../../../__test-utils__/create-mock-table';
import { createOneTable } from '../../utils';
import { MigrationsController } from '../migrations-controller';
import { runMigrations } from '../run-migrations';
import { createLocalClientConfig } from '@bridge/node-dynamodb';
import prompts from 'prompts';

const mockSpinner = {
  fail: jest.fn(),
  start: jest.fn(),
  succeed: jest.fn(),
};
jest.mock('../migrations-controller');
jest.mock('../../utils/create-one-table');
jest.mock('@bridge/node-utils', () => {
  const actual = jest.requireActual('@bridge/node-utils');
  return {
    ...actual,
    withPrettyOutput: jest.fn((fn) => fn({ spinner: mockSpinner })),
  };
});
jest.mock('prompts');
jest.mock('@bridge/node-dynamodb', () => {
  const actual = jest.requireActual('@bridge/node-dynamodb');
  return {
    ...actual,
    createDynamodbClient: jest.fn(),
  };
});

const mockCreateOneTable = createOneTable as jest.MockedFunction<any>;
const mockPrompt = prompts as jest.MockedFunction<any>;
const mockMigrationsController = MigrationsController as jest.MockedClass<any>;

describe('runMigrations', () => {
  const setup = () => {
    const client = {};
    const clientConfig = createLocalClientConfig(9999);
    const migrationConfig = {
      migrations: migrationMapFixture,
      schema: testTableSchema,
      tableName: 'TestTable',
    };
    const mockTable = createMockTable();
    mockCreateOneTable.mockImplementation(() => mockTable);
    return {
      config: {
        apply: false,
        client,
        clientConfig,
        migrationConfig,
      },
      mockTable,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return and log failure on any error', async () => {
    mockSpinner.start.mockImplementationOnce(() => {
      throw new Error('test error');
    });
    const { config } = setup();
    await runMigrations(config);
    await expect(mockSpinner.fail).toHaveBeenCalledWith('test error');
  });

  it(`should prompt to create the table if it doesn't exist and create table if yes`, async () => {
    const { config, mockTable } = setup();
    mockTable.exists.mockResolvedValueOnce(false);
    mockPrompt.mockResolvedValueOnce({ create: true });
    await runMigrations(config);
    expect(mockPrompt).toHaveBeenLastCalledWith(
      expect.objectContaining({
        name: 'create',
      }),
    );
    expect(mockTable.createTable).toHaveBeenCalledTimes(1);
  });

  it(`should return if create table response is no`, async () => {
    const { config, mockTable } = setup();
    mockTable.exists.mockResolvedValueOnce(false);
    mockPrompt.mockResolvedValueOnce({ create: false });
    await runMigrations(config);
    expect(mockPrompt).toHaveBeenLastCalledWith(
      expect.objectContaining({
        name: 'create',
      }),
    );
    expect(mockTable.createTable).toHaveBeenCalledTimes(0);
    expect(mockMigrationsController).not.toHaveBeenCalled();
  });

  it('should apply all migrations', async function () {
    const { config, mockTable } = setup();
    mockTable.exists.mockResolvedValueOnce(true);
    await runMigrations(config);
    expect(mockMigrationsController).toHaveBeenCalledTimes(1);
    const applyLatest = mockMigrationsController.mock.instances[0].applyLatest;
    expect(applyLatest).toHaveBeenCalledTimes(1);
  });
});
