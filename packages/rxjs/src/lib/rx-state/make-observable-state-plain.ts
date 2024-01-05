import { ObservableState, RootPlainState } from './rx-state.types';
import { observeAllStateValues } from './observe-all-state-values';

/**
 * Unwrap the observable values from an ObservableState object and returns a promise of the plain state object.
 * This is the inverse of makeStateObservable.
 * @param state
 */
export function makeObservableStatePlain<TState extends RootPlainState>(
  state: ObservableState<TState>,
): Promise<TState> {
  return new Promise((resolve, reject) => {
    try {
      observeAllStateValues(state).subscribe((stateValues) => {
        resolve(stateValues as TState);
      });
    } catch (e) {
      reject(e);
    }
  });
}
