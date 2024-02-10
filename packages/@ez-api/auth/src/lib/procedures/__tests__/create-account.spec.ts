import { defaultDbFixture } from '../../../__fixtures__/default-db.fixture';
import { createMockModelMap, createMockTable } from '../../../__test-utils__';
import { TableModelsMap } from '../../types';
import { createAccount } from '../create-account';
import { defaultAccountFixture } from '../../../__fixtures__/default-account.fixture';

describe('createAccount', function () {
  let userCount = 0;
  const setup = () => {
    userCount += 1;
    const accountConfig = {
      email: `new-test-user.${userCount}@email.com`,
      password: 'test!',
    };
    const mockTable = createMockTable();
    const dbRef = { current: { ...defaultDbFixture } };
    const mockModelMap = createMockModelMap(dbRef, mockTable);
    return {
      accountConfig,
      dbRef,
      mockModelMap,
    };
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an account', async function () {
    const { mockModelMap, accountConfig } = setup();
    await createAccount.executor(accountConfig, mockModelMap);
    (mockModelMap.Account.create as jest.MockedFn<any>).mockResolvedValue(
      defaultAccountFixture,
    );
    expect(mockModelMap.Account.create).toHaveBeenCalledTimes(1);
  });

  it('should return an account', async function () {
    const { mockModelMap, accountConfig } = setup();
    (mockModelMap.Account.create as jest.MockedFn<any>).mockClear();
    const account = await createAccount.executor(
      accountConfig,
      mockModelMap as never as TableModelsMap,
    );
    expect(account.email).toBe(`new-test-user.2@email.com`);
  });
});
