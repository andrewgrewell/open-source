import { defaultDbFixture } from '../../../__fixtures__/default-db.fixture';
import { createMockModelMap, createMockTable } from '../../../__test-utils__';
import { getAccount } from '../get-account';

describe('getAccount', () => {
  it('should get an account', async function () {
    const table = createMockTable();
    const modelMap = createMockModelMap({ current: defaultDbFixture }, table);
    await getAccount.executor(
      {
        email: 'test@email.com',
      },
      modelMap,
    );
    expect(modelMap.Account.get).toHaveBeenCalledWith(
      {
        email: 'test@email.com',
      },
      { follow: true, index: 'gs1' },
    );
  });
});
