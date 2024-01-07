import { combineLatest, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { makeHot } from './make-hot';
import { SourcesMap } from './types';

export interface ObserveObjectValuesOptions {
  initialValues?: Record<string, unknown>;
}

/**
 * Returns an observable of an object where all first level values are sync. This is useful for RxServices
 * or other objects with Observable values as keys. This is mainly used in non-reactive cases, like in some UI scenarios.
 * @note: This currently only handles an object 1 level deep
 * @param sourcesMap
 * @param options
 */
export function observeObjectValues<TSourcesMap extends SourcesMap = SourcesMap>(
  sourcesMap: TSourcesMap,
  options?: ObserveObjectValuesOptions,
) {
  const { initialValues = {} } = options || {};
  const cleanup = new Subject<void>();
  const entries = Object.entries(sourcesMap);
  const sources = entries.map(([key, source]) => {
    if (source instanceof Observable) {
      return makeHot({ cleanup, initialData: initialValues[key], source });
    }
    return of(source);
  });
  return new Observable((subscriber) => {
    combineLatest(sources)
      .pipe(
        map((latestSources) => {
          return latestSources.reduce((acc, value, index) => {
            const [key] = entries[index];
            return { ...acc, [key]: value };
          }, {});
        }),
        takeUntil(cleanup),
      )
      .subscribe(subscriber);
    return () => {
      cleanup.next();
      cleanup.complete();
    };
  });
}
