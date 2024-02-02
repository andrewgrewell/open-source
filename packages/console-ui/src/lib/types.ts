import { Spinner } from './components/spinner';
import { SignaleOptions } from 'signale';

export interface WithPrettyOutputContext {
  spinner: Spinner;
}
export type WithPrettyOutputCallback<TReturn = void> = (
  context: WithPrettyOutputContext,
) => Promise<TReturn> | TReturn;

export interface WithPrettyOutputOptions {
  spinnerOptions?: Record<string, unknown>;
  signaleOptions?: SignaleOptions;
  disableLogging?: boolean;
}

export interface PrettyOutputContextOptions {
  spinnerOptions?: Record<string, unknown>;
  signaleOptions?: SignaleOptions;
}
