import { createRxAction } from '../create-rx-action';
import { combineLatest, map, Observable, of, Subject, switchMap } from 'rxjs';

describe('createRxAction', () => {
  const testModifiers = {
    combined: (input: Observable<number>) => {
      return combineLatest([input, of(100)]).pipe(
        map(([value, baseValue]) => value + baseValue),
      );
    },
    error: () => {
      throw new Error('Test error');
    },
    switchMap: (input: Observable<number>) => {
      const startingCount = of(10);
      return startingCount.pipe(
        switchMap((initialCount) => {
          return input.pipe(
            map((value) => {
              return initialCount + value;
            }),
          );
        }),
      );
    },
  };

  it('should return an RxAction object', () => {
    const action = createRxAction();
    expect(action.trigger).toBeInstanceOf(Subject);
    expect(action.output).toBeInstanceOf(Observable);
  });

  it('should emit event data to subscribers', () => {
    const action = createRxAction();
    const nextSpy = jest.fn();
    action.output.subscribe(nextSpy);
    action.trigger.next('test');
    expect(nextSpy).toHaveBeenCalledWith('test');
  });

  it('should support passing a modifier function', () => {
    const action = createRxAction({
      outputModifier: testModifiers.switchMap,
    });
    const streamSpy = jest.fn();
    action.output.subscribe(streamSpy);

    action.trigger.next(5);

    expect(streamSpy).toHaveBeenCalledWith(15);
  });

  it('should support returning a new stream from modifier', () => {
    const action = createRxAction({
      outputModifier: testModifiers.combined,
    });
    const nextSpy = jest.fn();
    action.output.subscribe(nextSpy);

    action.trigger.next(100);

    expect(nextSpy).toHaveBeenCalledWith(200);
  });

  it('should return errors from modified stream', () => {
    const action = createRxAction({
      outputModifier: testModifiers.error,
    });
    const nextSpy = jest.fn();
    const errorSpy = jest.fn();
    action.output.subscribe({
      error: errorSpy,
      next: nextSpy,
    });
    action.trigger.next('test');
    expect(nextSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith(new Error('Test error'));
  });

  it('should emit primitive default value if provided', () => {
    const defaultValue = false;
    const action = createRxAction({
      defaultValue,
    });
    const nextSpy = jest.fn();
    action.output.subscribe(nextSpy);
    expect(nextSpy).toHaveBeenCalledWith(defaultValue);
  });

  it('should emit observable default value if provided', () => {
    const defaultValue = of('defaultValue');
    const action = createRxAction({
      defaultValue,
    });
    const nextSpy = jest.fn();
    action.output.subscribe(nextSpy);
    expect(nextSpy).toHaveBeenCalledWith('defaultValue');
  });

  it('should NOT emit observable default value if primary value already emitted', () => {
    const defaultValue = new Subject();
    const action = createRxAction({
      defaultValue,
    });
    const nextSpy = jest.fn();
    action.output.subscribe(nextSpy);
    action.trigger.next('first');
    expect(nextSpy).toHaveBeenLastCalledWith('first');
    defaultValue.next('default');
    expect(nextSpy).not.toHaveBeenCalledWith('default');
  });
});
