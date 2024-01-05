import { Observable, startWith } from 'rxjs';

export function makeHot<TSourceData = unknown>(
  source: Observable<TSourceData>,
  initialData?: TSourceData,
) {
  return source.pipe(startWith(initialData));
}
