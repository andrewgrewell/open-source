import { lastValueFrom, Observable, startWith } from 'rxjs';

export function promisifyObservable<
  TObservable extends Observable<unknown> = Observable<unknown>,
>(source: TObservable) {
  source.subscribe();
  return lastValueFrom(source.pipe(startWith(undefined)));
}
