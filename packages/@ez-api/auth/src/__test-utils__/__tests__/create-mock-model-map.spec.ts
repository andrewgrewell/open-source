import { DbFixture, defaultDbFixture } from '../../__fixtures__/default-db.fixture';
import { createMockModelMap } from '../create-mock-model-map';
import { createMockTable } from '../create-mock-table';
import { defaultAccountFixture } from '../../__fixtures__/default-account.fixture';

describe('createMockModelMap', function () {
  const setup = (mockDb?: DbFixture) => {
    const dbRef = {
      current: mockDb || {
        Account: [],
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

  describe('Account', function () {
    it('should create an account', async function () {
      const { dbRef, table } = setup();
      const modelMap = createMockModelMap(dbRef, table);
      const account = await modelMap.Account.create({
        email: 'test-user@email.com',
        password: 'P@ssw0rd!',
      });
      expect(account).toBeDefined();
      expect(dbRef.current.Account[0]).toEqual(account);
    });

    it('should throw an error if account already exists', function () {
      const { dbRef, table } = setup(defaultDbFixture);
      const modelMap = createMockModelMap(dbRef, table);
      return expect(
        async () =>
          await modelMap.Account.create({
            email: defaultAccountFixture.email,
            password: defaultAccountFixture.password,
          }),
      ).rejects.toThrow('Account already exists');
    });
  });
});
