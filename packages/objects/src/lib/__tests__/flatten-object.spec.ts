import { flattenObject } from '../flatten-object';

describe('flattenObject', () => {
  it('returns matching object if already flat', () => {
    const testObj = {
      key1: 1,
      key2: 2,
    };
    const flattened = flattenObject(testObj);
    expect(flattened).toEqual(testObj);
  });

  it('removes empty values on flat object', () => {
    const testObj = {
      key1: undefined,
      key2: null,
      key3: 'present',
    };
    const flattened = flattenObject(testObj);
    expect(flattened).toEqual({ key3: 'present' });
  });

  it('keys nested values on final flat object', () => {
    const initial = {
      key1: 1,
      key2: {
        nested1: 1,
        nested2: 2,
      },
    };
    const flattened = flattenObject(initial);
    expect(flattened).toEqual({
      key1: 1,
      'key2.nested1': 1,
      'key2.nested2': 2,
    });
  });

  it('does not key empty values on final flat object', () => {
    const initial = {
      key1: 1,
      key2: {
        nested1: 1,
        nested2: 2,
      },
      key3: {
        nested1: {
          nested2: 1,
          nested3: undefined,
        },
      },
    };
    const flattened = flattenObject(initial);
    expect(flattened).toEqual({
      key1: 1,
      'key2.nested1': 1,
      'key2.nested2': 2,
      'key3.nested1.nested2': 1,
    });
  });
});
