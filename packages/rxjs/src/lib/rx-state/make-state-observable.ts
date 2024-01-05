import { BehaviorSubject } from 'rxjs';
import { ObservableState, RootPlainState } from './rx-state.types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type OkAny = any;

function createReactiveValue(defaultValue: OkAny) {
  const valueSubject = new BehaviorSubject(defaultValue);
  return {
    setValue: (newValue: OkAny) => valueSubject.next(newValue),
    value: valueSubject.asObservable(),
  };
}

function wrapObjectValues<TState>(obj: RootPlainState): ObservableState<TState> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const isObject = value && value.constructor.name === 'Object';
    if (isObject) {
      return {
        ...acc,
        [key]: wrapObjectValues(value as RootPlainState),
      };
    }
    return {
      ...acc,
      [key]: createReactiveValue(value),
    };
  }, {} as ObservableState<TState>);
}

/**
 * Takes an object and returns a new object with non object values wrapped as ReactiveValues
 * which can be subscribed to and updated.
 * @param state
 * @example
 * const plain = { a: 1, b: { c: 2 } };
 * // { a: { value: Observable<1>, setValue: () => void }, b: { c: { value: Observable<2>, setValue: () => void } } }
 * const observable = makeStateObservable({ initialState: plain });
 */
export function makeStateObservable<TState extends RootPlainState>(
  state: TState,
): ObservableState<TState> {
  return wrapObjectValues(state);
}
