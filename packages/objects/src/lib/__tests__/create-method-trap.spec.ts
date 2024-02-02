import { createMethodTrap } from '../create-method-trap';

describe('createMethodTrap', () => {
  let testObj: { bar: string; getFoo(): void };

  beforeEach(() => {
    testObj = {
      bar: 'bar',
      getFoo: jest.fn(),
    };
  });

  it('should trap method calls on object', function () {
    const proxy = new Proxy(testObj, {
      get: createMethodTrap(() => {
        // trapped
      }),
    });
    (proxy as typeof testObj).getFoo();
    expect(testObj.getFoo).not.toHaveBeenCalled();
  });

  it('should pass in target, prop, and args to trap handler', function () {
    return new Promise((resolve) => {
      const args = ['arg1', 'arg2'];
      const proxy = new Proxy(testObj, {
        get: createMethodTrap((target, prop, args) => {
          expect(target).toBe(testObj);
          expect(prop).toBe('getFoo');
          expect(args).toEqual(args);
          resolve(null);
        }),
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (proxy as typeof testObj).getFoo(...args);
      expect(testObj.getFoo).not.toHaveBeenCalled();
    });
  });

  it('should not affect non-methods', function () {
    const proxy = new Proxy(testObj, {
      get: createMethodTrap(() => {
        // trapped
      }),
    });
    expect(proxy['bar']).toEqual('bar');
  });
});
