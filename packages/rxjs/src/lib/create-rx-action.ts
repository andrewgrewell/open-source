import { isObservable, merge, Observable, of, Subject, takeUntil } from 'rxjs';
import { CreateRxActionOptions, RxAction } from './types';

export function createRxAction<TInput, TOutput = TInput>(
  options: CreateRxActionOptions<TInput, TOutput> = {},
): RxAction<TInput, TOutput> {
  const { defaultValue, outputModifier } = options;

  // setup input
  const trigger = new Subject<TInput>();

  // setup output
  let output: Observable<TOutput>;
  if (isObservable(defaultValue)) {
    output = merge(defaultValue.pipe(takeUntil(trigger)), trigger) as Observable<TOutput>;
  } else if (defaultValue !== undefined) {
    output = merge(of(defaultValue), trigger) as Observable<TOutput>;
  } else {
    output = trigger.asObservable() as unknown as Observable<TOutput>;
  }
  // setup output modifier
  if (outputModifier) {
    try {
      output = outputModifier(trigger);
    } catch (e) {
      trigger.error(e);
    }
  }

  return {
    output,
    trigger,
  };
}
