import { migrationMapFixture } from '../../../__fixtures__/migration-map.fixture';
import { createMockMigrateInstance } from '../../../__test-utils__/create-mock-migrate-instance';
import { MigrationsConfigMap } from '../../types';
import { convertMigrationsMapToConfigArray } from '../convert-migrations-map-to-config-array';
import { createMigrateInstance } from '../create-migrate-instance';
import { createMigration } from '../create-migration';
import { MigrationsController } from '../migrations-controller';
import { Migrate } from 'onetable-migrate';

jest.mock('../create-migration', () => ({
  createMigration: jest.fn((config) => ({
    description: config.description,
    down: jest.fn(),
    schema: config.schema,
    up: jest.fn(),
    version: config.version,
  })),
}));

jest.mock('../create-migrate-instance', () => ({
  createMigrateInstance: jest.fn(() => ({
    apply: jest.fn(),
    getCurrentVersion: jest.fn(() => '0.0.0'),
  })),
}));

const mockCreateMigration = createMigration as jest.Mock;
const mockCreateMigrateInstance = createMigrateInstance as jest.Mock;

describe('MigrationsController', () => {
  const mockCurrentVersion = (version: string) => {
    const mockMigrateInstance = createMockMigrateInstance({ currentVersion: version });
    mockCreateMigrateInstance.mockImplementation(() => mockMigrateInstance);
    return mockMigrateInstance;
  };
  const setup = (migrations: MigrationsConfigMap<any> = migrationMapFixture) => {
    const tableName = 'TestTable';
    const client = {};
    const config = {
      client,
      crypto: {
        primary: {
          cipher: 'test-cipher',
          password: 'test-secret',
        },
      },
      migrations,
      tableName,
    };
    const controller = new MigrationsController(config);
    return {
      client,
      controller,
      tableName,
    };
  };

  beforeEach(() => {
    mockCreateMigration.mockClear();
    mockCreateMigrateInstance.mockClear();
  });

  it('should map migration config map to migration config array', () => {
    setup();
    expect(mockCreateMigration).toHaveBeenCalled();
  });

  describe('downgrade', () => {
    it('should downgrade to target version', async () => {
      const mockMigrateInstance = mockCurrentVersion('0.0.2');
      const { controller } = setup();
      await controller.downgrade('0.0.1');
      expect(mockMigrateInstance.apply).toHaveBeenCalledWith(-1, '0.0.1', { dry: true });
    });

    it('should downgrade to previous version if no target version is provided', async () => {
      const mockMigrateInstance = mockCurrentVersion('0.0.2');
      const { controller } = setup();
      await controller.downgrade();
      expect(mockMigrateInstance.apply).toHaveBeenCalledWith(-1, '0.0.1', { dry: true });
    });

    it('should throw error if no previous migration is found', async () => {
      mockCurrentVersion('0.0.1');
      const { controller } = setup({
        '0.0.3': migrationMapFixture['0.0.2'],
      });
      await expect(() => controller.downgrade()).rejects.toThrow();
    });
  });

  describe('getCurrentVersion', () => {
    it('should return current version', async () => {
      const mockMigrateInstance = mockCurrentVersion('0.0.1');
      const { controller } = setup();
      const version = await controller.getCurrentVersion();
      expect(version).toEqual('0.0.1');
      expect(mockMigrateInstance.getCurrentVersion).toHaveBeenCalled();
    });

    it('should use migrate instance passed in', async () => {
      const mockMigrateInstance = mockCurrentVersion('1.0.1');
      const { controller } = setup();
      const version = await controller.getCurrentVersion(
        mockMigrateInstance as never as Migrate,
      );
      expect(version).toEqual('1.0.1');
    });
  });

  describe('getAppliedMigrations', () => {
    it('should return applied migrations', async () => {
      const mockMigrateInstance = mockCurrentVersion('0.0.1');
      const { controller } = setup();
      const migrations = await controller.getAppliedMigrations();
      expect(migrations).toEqual(undefined);
      expect(mockMigrateInstance.findPastMigrations).toHaveBeenCalled();
    });

    it('should use migrate instance passed in', async () => {
      const mockMigrateInstance = mockCurrentVersion('1.0.1');
      const { controller } = setup();
      const migrations = await controller.getAppliedMigrations(
        mockMigrateInstance as never as Migrate,
      );
      expect(migrations).toEqual(undefined);
    });
  });

  describe('getOutstandingMigrations', () => {
    it('should return outstanding migrations', async () => {
      const mockMigrateInstance = mockCurrentVersion('0.0.1');
      const { controller } = setup();
      const migrations = await controller.getOutstandingMigrations();
      expect(migrations).toEqual(undefined);
      expect(mockMigrateInstance.getOutstandingMigrations).toHaveBeenCalled();
    });

    it('should use migrate instance passed in', async () => {
      const mockMigrateInstance = mockCurrentVersion('1.0.1');
      const { controller } = setup();
      const migrations = await controller.getOutstandingMigrations(
        mockMigrateInstance as never as Migrate,
      );
      expect(migrations).toEqual(undefined);
    });
  });

  describe('upgrade', () => {
    it('should upgrade to target version', async () => {
      const mockMigrateInstance = mockCurrentVersion('0.0.1');
      const { controller } = setup();
      await controller.upgrade('0.0.2');
      expect(mockMigrateInstance.apply).toHaveBeenCalledWith(1, '0.0.2', { dry: true });
    });

    it('should upgrade to next version if no target version is provided', async () => {
      const mockMigrateInstance = mockCurrentVersion('0.0.1');
      const { controller } = setup();
      await controller.upgrade();
      expect(mockMigrateInstance.apply).toHaveBeenCalledWith(1, '0.0.2', { dry: true });
    });

    it('should throw error if no next migration is found', async () => {
      mockCurrentVersion('0.0.2');
      const { controller } = setup({
        '0.0.1': migrationMapFixture['0.0.1'],
      });
      await expect(() => controller.upgrade()).rejects.toThrow();
    });
  });

  describe('setVersion', () => {
    it('should downgrade if targetVersion is less than current', async () => {
      const mockMigrateInstance = mockCurrentVersion('0.0.2');
      const { controller } = setup();
      await controller.setVersion('0.0.1');
      expect(mockMigrateInstance.apply).toHaveBeenCalledWith(-1, '0.0.1', { dry: true });
    });

    it('should upgrade if targetVersion is greater than current', async () => {
      const mockMigrateInstance = mockCurrentVersion('0.0.1');
      const { controller } = setup();
      await controller.setVersion('0.0.2');
      expect(mockMigrateInstance.apply).toHaveBeenCalledWith(1, '0.0.2', { dry: true });
    });
  });

  describe('applyLatest', () => {
    it('should apply all migrations leading up to and including latest', async function () {
      const mockMigrateInstance = mockCurrentVersion('0.0.0');
      mockMigrateInstance.getOutstandingMigrations.mockImplementation(() =>
        convertMigrationsMapToConfigArray(migrationMapFixture),
      );
      const { controller } = setup();
      await controller.applyLatest();
      expect(mockMigrateInstance.apply).toHaveBeenNthCalledWith(1, 1, '0.0.1', {
        dry: true,
      });
      expect(mockMigrateInstance.apply).toHaveBeenNthCalledWith(2, 1, '0.0.2', {
        dry: true,
      });
    });
  });
});
