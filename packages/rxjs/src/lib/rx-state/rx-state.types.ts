import { Observable } from 'rxjs';

export type StateKey = string | number | symbol;

export type NestedPlainState =
  | string
  | number
  | null
  | boolean
  | { [key: StateKey]: NestedPlainState };

export type RootPlainState = { [key: StateKey]: NestedPlainState };

export interface ObservableStateValue<TValue> {
  value: Observable<TValue>;
  setValue: (value: TValue) => void;
}

export type ObservableState<TState> = {
  [key in keyof TState]: TState[key] extends RootPlainState
    ? ObservableState<TState[key]>
    : ObservableStateValue<any>;
};
