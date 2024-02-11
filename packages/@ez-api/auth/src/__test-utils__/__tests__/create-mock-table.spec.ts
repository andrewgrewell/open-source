import { defaultDbFixture } from '../../__fixtures__/default-db.fixture';
import { createMockTable } from '../create-mock-table';

describe('createMockTable', function () {
  describe('exists', function () {
    it('should return false if no mock db has been provide', async function () {
      const table = createMockTable();
      expect(await table.exists()).toBe(false);
    });

    it('should return true if mock db is provided', async function () {
      const table = createMockTable(defaultDbFixture);
      expect(await table.exists()).toBe(true);
    });
  });

  describe('getModel', function () {
    it.each(['Account'])('should return a mock model for %s', function (modelName) {
      const table = createMockTable();
      expect(table.getModel(modelName)).toBeDefined();
    });
  });

  describe('createTable', function () {
    it('should create a mock db if one does not exist', async function () {
      const table = createMockTable();
      await table.createTable();
      return expect(await table.exists()).toBe(true);
    });

    it('should throw an error if a mock db already exists', function () {
      const table = createMockTable(defaultDbFixture);
      return expect(async () => await table.createTable()).rejects.toThrow();
    });

    it('should persist a mock db in memory', async function () {
      const table = createMockTable();
      await table.createTable();
      const testAccount = table.getModel('Account');
      const testAccountCreate = {
        email: 'test@email.com',
        name: 'test',
        password: 'password',
      };
      await testAccount.create(testAccountCreate);
      expect(table.__mockDbRef.current?.Account[0]).toEqual(
        expect.objectContaining(testAccountCreate),
      );
    });
  });
});
