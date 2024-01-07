import { nextValuePromise } from '../next-value-promise';
import { Subject } from 'rxjs';

describe('nextValuePromise', () => {
  it('should return the next value', async () => {
    const source = new Subject<number>();
    const valuePromise = nextValuePromise(source);
    source.next(1);
    return expect(valuePromise).resolves.toEqual(1);
  });

  it('should throw an error if the observable errors', async () => {
    const source = new Subject<number>();
    const valuePromise = nextValuePromise(source);
    source.error('error');
    return expect(valuePromise).rejects.toEqual('error');
  });
});
