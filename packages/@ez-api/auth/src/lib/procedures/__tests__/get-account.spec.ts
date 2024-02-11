import { defaultDbFixture } from '../../../__fixtures__/default-db.fixture';
import { createMockModelMap, createMockTable } from '../../../__test-utils__';
import { getAccount } from '../get-account';

describe('getAccount', () => {
  it('should get an account', async function () {
    const Table = createMockTable() as never;
    const modelMap = createMockModelMap({ current: defaultDbFixture }, Table);
    await getAccount({
      Table,
      ...modelMap,
      email: 'test@email.com',
    });
    expect(modelMap.Account.get).toHaveBeenCalledWith(
      {
        email: 'test@email.com',
      },
      { follow: true, index: 'gs1' },
    );
  });
});
