import { promisifyObservable } from '../promisify-observable';
import { Observable, of } from 'rxjs';

describe('promisifyObservable', () => {
  it('should return a promise that completes when the observable completes', async () => {
    const spy = jest.fn();
    await promisifyObservable(of(42)).then(spy);
    expect(spy).toHaveBeenCalledWith(42);
  });

  it('should handle observables that never emit a value', async () => {
    const observable = new Observable((subscriber) => {
      subscriber.complete();
    });
    const spy = jest.fn();
    await promisifyObservable(observable).then(spy);
    expect(spy).toHaveBeenCalledWith(undefined);
  });

  it('should reject if observable errors', async () => {
    const observable = new Observable((subscriber) => {
      subscriber.error(new Error('test'));
    });
    const catchSpy = jest.fn();
    await promisifyObservable(observable).catch(catchSpy);
    expect(catchSpy).toHaveBeenCalledWith(new Error('test'));
  });
});
