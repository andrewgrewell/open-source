import { getPortFromUrl } from '../get-port-from-url';

describe('getPortFromUrl', () => {
  it('should return port as number if port found', function () {
    expect(getPortFromUrl('http://localhost:8000')).toEqual(8000);
  });

  it('should return undefined if no port found', function () {
    expect(getPortFromUrl('http://localhost')).toEqual(undefined);
  });
});
