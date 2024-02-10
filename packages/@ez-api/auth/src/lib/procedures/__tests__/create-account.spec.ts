import { defaultDbFixture } from '../../../__fixtures__/default-db.fixture';
import { createMockModelMap, createMockTable } from '../../../__test-utils__';
import { createAccount } from '../create-account';
import { createRandomCode } from '../../../lib/utils';
import { defaultAccountFixture } from '../../../__fixtures__/default-account.fixture';

jest.mock('../../../lib/utils', () => {
  return {
    createRandomCode: jest.fn(),
  };
});

const mockCreateRandomCode = createRandomCode as jest.MockedFunction<
  typeof createRandomCode
>;

describe('createAccount', function () {
  let userCount = 0;
  const setup = () => {
    userCount += 1;
    const accountConfig = {
      email: `new-test-user.${userCount}@email.com`,
      password: 'test!',
    };
    const mockTable = createMockTable() as never;
    const dbRef = { current: { ...defaultDbFixture } };
    const mockModelMap = createMockModelMap(dbRef, mockTable);
    return {
      Table: mockTable,
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
    const { mockModelMap, accountConfig, Table } = setup();
    await createAccount({ Table, ...mockModelMap, ...accountConfig });
    (mockModelMap.Account.create as jest.MockedFn<any>).mockResolvedValue(
      defaultAccountFixture,
    );
    expect(mockModelMap.Account.create).toHaveBeenCalledTimes(1);
  });

  it('should return an account', async function () {
    const { mockModelMap, accountConfig } = setup();
    (mockModelMap.Account.create as jest.MockedFn<any>).mockClear();
    const { account } = await createAccount({
      Table: {} as never,
      ...mockModelMap,
      ...accountConfig,
    });
    expect(account.email).toBe(`new-test-user.2@email.com`);
  });

  it('should return a verifyCode', async function () {
    const code = '123456';
    mockCreateRandomCode.mockReturnValue(code);
    const { mockModelMap, accountConfig } = setup();
    (mockModelMap.Account.create as jest.MockedFn<any>).mockClear();
    const { verifyCode } = await createAccount({
      Table: {} as never,
      ...mockModelMap,
      ...accountConfig,
    });
    expect(verifyCode).toBe(code);
  });
});
