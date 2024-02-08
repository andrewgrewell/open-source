import { ezApiDynamodb } from './ez-api-dynamodb';

describe('ezApiDynamodb', () => {
  it('should work', () => {
    expect(ezApiDynamodb()).toEqual('ez-api-dynamodb');
  });
});
