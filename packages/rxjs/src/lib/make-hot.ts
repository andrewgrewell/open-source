import { Observable, shareReplay, startWith, takeUntil } from 'rxjs';

export interface MakeHotOptions<TSourceData = unknown> {
  /**
   * The source observable to make hot.
   */
  source: Observable<TSourceData>;
  /**
   * Initial data to emit before the source emits.
   */
  initialData?: unknown;
  /**
   * Observable to clean up the inner hot subscription
   */
  cleanup: Observable<unknown>;
}
export function makeHot<TSourceData = unknown>(options: MakeHotOptions<TSourceData>) {
  const { source, initialData, cleanup } = options;
  const hotSource = source.pipe(
    startWith(initialData),
    shareReplay(1),
    takeUntil(cleanup),
  );
  hotSource.subscribe();
  return hotSource;
}
