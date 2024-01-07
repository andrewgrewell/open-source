import { Observable, take } from 'rxjs';

/**
 * Take only the next value from an observable and call the callback with it.
 * @param source
 * @param callback
 * @param onError
 */
export function nextValueCallback<TSourceData = unknown>(
  source: Observable<TSourceData>,
  callback: (value: TSourceData) => void,
  onError?: (error: unknown) => void,
) {
  return source.pipe(take(1)).subscribe({
    error: onError,
    next: callback,
  });
}
