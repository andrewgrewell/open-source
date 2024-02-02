import { DbFixture, defaultDbFixture } from '../../__fixtures__/default-db.fixture';
import { defaultUserFixture } from '../../__fixtures__/default-user.fixture';
import { createMockModelMap } from '../create-mock-model-map';
import { createMockTable } from '../create-mock-table';

describe('createMockModelMap', function () {
  const setup = (mockDb?: DbFixture) => {
    const dbRef = {
      current: mockDb || {
        Org: [],
        User: [],
      },
    };
    return {
      dbRef: dbRef,
      table: createMockTable(),
    };
  };
  it('should return a mock model map', function () {
    const { dbRef, table } = setup();
    const modelMap = createMockModelMap(dbRef, table);
    expect(modelMap).toBeDefined();
  });

  describe('User', function () {
    it('should create a user', async function () {
      const { dbRef, table } = setup();
      const modelMap = createMockModelMap(dbRef, table);
      const user = await modelMap.User.create({
        displayName: 'Test User',
        email: 'test-user@email.com',
        password: 'P@ssw0rd!',
      });
      expect(user).toBeDefined();
      expect(dbRef.current.User[0]).toEqual(user);
    });

    it('should throw an error if user already exists', function () {
      const { dbRef, table } = setup(defaultDbFixture);
      const modelMap = createMockModelMap(dbRef, table);
      return expect(
        async () => await modelMap.User.create(defaultUserFixture),
      ).rejects.toThrow('User already exists');
    });
  });
});
