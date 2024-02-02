import { createDynamicMap, CreateDynamicMapOptions } from '../create-dynamic-map';

type TestMap = {
  stringValue: string;
  numberValue: number;
} & { [key: string]: unknown };

describe('createDynamicMap', () => {
  const defaultStringValue = 'default string value';
  const defaultNumberValue = 99;
  const defaultNotFoundValue = 'Not found';
  const setup = (options?: CreateDynamicMapOptions) => {
    const defaultValueBuilder = jest.fn((key: string | symbol) => {
      if (key === 'stringValue') {
        return defaultStringValue;
      } else if (key === 'numberValue') {
        return defaultNumberValue;
      }
      return defaultNotFoundValue;
    });
    return {
      defaultValueBuilder,
      map: createDynamicMap<TestMap>(defaultValueBuilder, options),
    };
  };

  it('should return an object which any key can return a default value', () => {
    const { map } = setup();
    expect(map.stringValue).toEqual(defaultStringValue);
    expect(map['somethingElse']).toEqual(defaultNotFoundValue);
  });

  it('should not allow setting values if options.freeze is true', () => {
    const { map } = setup({ freeze: true });
    expect(() => {
      map['foo'] = 'bar';
    }).toThrow('Cannot define property foo, object is not extensible');
  });

  it('should support iteration of the map', () => {
    const { map } = setup();
    const values = {
      foo: 'bar',
      numberValue: 1000,
      stringValue: 'new string value',
    };
    const keys = Object.keys(values);
    map.numberValue = values.numberValue;
    map.stringValue = values.stringValue;
    map['foo'] = values.foo;
    for (const [key, value] of map) {
      expect(keys.includes(key as never)).toBe(true);
      expect(value).toEqual(values[key as never]);
    }
  });

  it('should return the __testId__ if set', () => {
    const testId = 'test-id';
    const { map } = setup({ testId });
    expect(map['__testId__']).toEqual(testId);
  });

  it('should not build the default value if the value is already set on the map', () => {
    const { map, defaultValueBuilder } = setup();
    const key = 'someValue';
    const value = { foo: 'bar' };
    const setValue = map[key];
    expect(defaultValueBuilder).toHaveBeenCalledTimes(1);
    expect(setValue).toEqual(defaultNotFoundValue);
    map[key] = value;
    const newValue = map[key];
    expect(defaultValueBuilder).toHaveBeenCalledTimes(1);
    expect(newValue).toEqual(value);
  });
});
