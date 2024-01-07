import { observeObjectValues } from '../observe-object-values';
import { of, Subject } from 'rxjs';

describe('observeObjectValues', () => {
  const testSourcesMap = {
    a: of(1),
    b: 3,
    c: new Subject<number>(),
  };

  it('should return an observable of the latest values from sources map', async () => {
    const spy = jest.fn();
    observeObjectValues(testSourcesMap).subscribe(spy);
    const result = spy.mock.calls[0][0];
    expect(result.a).toBe(1);
    expect(result.b).toBe(3);
    expect(result.c).toBeUndefined();
  });

  it('should cleanup when unsubscribed', () => {
    const spy = jest.fn();
    const subscription = observeObjectValues(testSourcesMap).subscribe(spy);
    expect(spy).toHaveBeenCalledTimes(1);
    testSourcesMap.c.next(1);
    expect(spy).toHaveBeenCalledTimes(2);
    subscription.unsubscribe();
    testSourcesMap.c.next(2);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
