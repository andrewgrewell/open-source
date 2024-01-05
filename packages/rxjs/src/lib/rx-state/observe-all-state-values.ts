import { forkJoin, map, Observable } from 'rxjs';
import { set } from 'lodash';
import { ObservableState } from './rx-state.types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type OkAny = any;

function extractObservableValues(
  obj: ObservableState<OkAny>,
  basePath = '',
): Record<string, Observable<OkAny>> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const fullPath = basePath ? `${basePath}.${key}` : key;
      if (value.value && value.setValue) {
        const observableValue = value.value as Observable<OkAny>;
        return {
          ...acc,
          [fullPath]: observableValue,
        };
      }
      return {
        ...acc,
        ...extractObservableValues(value as ObservableState<OkAny>, key),
      };
    },
    {} as Record<string, Observable<OkAny>>,
  );
}

export function observeAllStateValues<TState extends ObservableState<OkAny>>(
  state: TState,
) {
  const flatValues = extractObservableValues(state);
  return forkJoin(flatValues).pipe(
    map((stateValuesFlat) => {
      const result = {};
      Object.entries(stateValuesFlat).forEach(([key, value]) => {
        set(result, key, value);
      });
      return result;
    }),
  );
}
