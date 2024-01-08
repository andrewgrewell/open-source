import { nextValueCallback } from '../next-value-callback';
import { Subject } from 'rxjs';

describe('nextValueCallback', () => {
  it('should call callback with the next value', () => {
    const source = new Subject<number>();
    const callback = jest.fn();
    nextValueCallback(source, callback);
    source.next(1);
    expect(callback).toHaveBeenCalledWith(1);
  });

  it('should only call callback once', () => {
    const source = new Subject<number>();
    const callback = jest.fn();
    nextValueCallback(source, callback);
    source.next(1);
    source.next(2);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback if source completes', () => {
    const source = new Subject<number>();
    const callback = jest.fn();
    nextValueCallback(source, callback);
    source.next(1);
    source.complete();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should NOT call callback if source errors', () => {
    const source = new Subject<number>();
    const callback = jest.fn();
    nextValueCallback(source, callback);
    source.error(new Error('test'));
    source.next(1);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should call onError if source errors', () => {
    const source = new Subject<number>();
    const callback = jest.fn();
    const onError = jest.fn();
    nextValueCallback(source, callback, onError);
    source.error(new Error('test'));
    expect(onError).toHaveBeenCalledWith(new Error('test'));
  });
});
