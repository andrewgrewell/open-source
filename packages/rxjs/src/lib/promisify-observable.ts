import { lastValueFrom, Observable, startWith } from 'rxjs';

export function promisifyObservable<
  TObservable extends Observable<unknown> = Observable<unknown>,
>(source: TObservable) {
  return lastValueFrom(source.pipe(startWith(undefined)));
}
