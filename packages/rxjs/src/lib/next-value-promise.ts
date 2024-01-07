import { lastValueFrom, Observable, take } from 'rxjs';

/**
 * Return a promise for the next value from an observable.
 * @param source
 * @param callback
 * @param onError
 */
export function nextValuePromise<TSourceData = unknown>(source: Observable<TSourceData>) {
  return lastValueFrom(source.pipe(take(1)));
}
