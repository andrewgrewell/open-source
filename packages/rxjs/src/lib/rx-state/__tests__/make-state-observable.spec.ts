import { makeStateObservable } from '../make-state-observable';

describe('makeStateObservable', () => {
  it('should return observable values from flat object', () => {
    const initialState = {
      baz: null,
      foo: 'bar',
    };
    const result = makeStateObservable({ initialState });
    const fooSpy = jest.fn();
    const bazSpy = jest.fn();
    result.foo.value.subscribe(fooSpy);
    result.baz.value.subscribe(bazSpy);
    expect(fooSpy).toHaveBeenCalledWith(initialState.foo);
    expect(bazSpy).toHaveBeenCalledWith(initialState.baz);
  });

  it('should return observable values from nested object', () => {
    const initialState = {
      foo: {
        bar: 'baz',
      },
    };
    const result = makeStateObservable({ initialState });
    const barSpy = jest.fn();
    result.foo.bar.value.subscribe(barSpy);
    expect(barSpy).toHaveBeenCalledWith(initialState.foo.bar);
  });
});
