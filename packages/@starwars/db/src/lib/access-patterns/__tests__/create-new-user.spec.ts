import { defaultDbFixture } from '../../../__fixtures__/default-db.fixture';
import { defaultOrgFixture } from '../../../__fixtures__/default-org.fixture';
import { defaultUserFixture } from '../../../__fixtures__/default-user.fixture';
import { createMockModelMap, createMockTable } from '../../../__test-utils__';
import { TableModelsMap } from '../../types';
import { createNewUser } from '../create-new-user';

describe('createNewUser', function () {
  let userCount = 0;
  const setup = () => {
    userCount += 1;
    const userConfig = {
      displayName: 'Test User From Test',
      email: `new-test-user.${userCount}@email.com`,
      password: 'testP@ssw0rd!',
    };
    const mockTable = createMockTable();
    const dbRef = { current: { ...defaultDbFixture } };
    const mockModelMap = createMockModelMap(dbRef, mockTable);
    return {
      dbRef,
      mockModelMap,
      userConfig,
    };
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create org for user if not an invite', async function () {
    const { mockModelMap, userConfig } = setup();
    await createNewUser.executor(userConfig, mockModelMap as never as TableModelsMap);
    mockModelMap.Org.create.mockResolvedValue(defaultOrgFixture);
    expect(mockModelMap.Org.create).toHaveBeenCalledTimes(1);
  });

  it('should create user', async function () {
    const { mockModelMap, userConfig } = setup();
    await createNewUser.executor(userConfig, mockModelMap as never as TableModelsMap);
    mockModelMap.User.create.mockResolvedValue({
      ...defaultUserFixture,
      ...userConfig,
    });
    expect(mockModelMap.User.create).toHaveBeenCalledTimes(1);
  });

  it('should join user to org if invite', async function () {
    const { mockModelMap, userConfig } = setup();
    await createNewUser.executor(
      { ...userConfig, orgId: 'default-org-id' },
      mockModelMap as never as TableModelsMap,
    );
    mockModelMap.Org.create.mockResolvedValue(defaultOrgFixture);
    expect(mockModelMap.User.create).toHaveBeenLastCalledWith(
      expect.objectContaining({ orgId: 'default-org-id' }),
    );
  });

  it('should return user', async function () {
    const { mockModelMap, userConfig } = setup();
    mockModelMap.User.create.mockClear();
    const user = await createNewUser.executor(
      { ...userConfig, orgId: 'default-org-id' },
      mockModelMap as never as TableModelsMap,
    );
    expect(user.id).toBe('user-id-2');
  });
});
