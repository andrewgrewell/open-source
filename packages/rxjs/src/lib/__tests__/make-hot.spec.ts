import { makeHot } from '../make-hot';
import { from, Subject } from 'rxjs';
import { nextValuePromise } from '../next-value-promise';

describe('makeHot', () => {
  const cleanup = new Subject<void>();
  afterEach(() => {
    cleanup.next();
  });

  it('should make observable hot and emit undefined if no initial value', async () => {
    const source = new Subject<number>();
    const hotSource = makeHot({ cleanup, source });
    const value = await nextValuePromise(hotSource);
    expect(value).toBeUndefined();
  });

  it('should make observable hot and emit initial value', async () => {
    const source = new Subject<number>();
    const hotSource = makeHot({ cleanup, initialData: 42, source });
    const value = await nextValuePromise(hotSource);
    expect(value).toBe(42);
  });

  it('should make observable hot', async () => {
    const source = from([1, 2, 3]);
    const hotSource = makeHot({ cleanup, initialData: 0, source });
    const spy = jest.fn();
    hotSource.subscribe(spy);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(3);
  });
});
