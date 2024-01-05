import { BehaviorSubject, EMPTY, from, Observable, of, Subject } from 'rxjs';
import { CreateTaskOptions, Task, TaskProgressUpdate, TaskStatus } from './types';

export function createTask<TRunnerOptions = unknown, TRunnerOutput = unknown>(
  options: CreateTaskOptions<TRunnerOptions, TRunnerOutput>,
): Task<TRunnerOptions, TRunnerOutput> {
  const { runner, name } = options;
  const progress = new BehaviorSubject<TaskProgressUpdate>({ completePercent: 0 });
  const status = new BehaviorSubject<TaskStatus>(undefined);
  const output = new Subject<TRunnerOutput>();

  function completeStreams(data?: TRunnerOutput) {
    if (data) {
      output.next(data);
    }
    progress.next({ completePercent: 1, message: 'Done' });
    status.next('completed');
    progress.complete();
    status.complete();
    output.complete();
  }

  function errorStreams(err: unknown) {
    status.next('failed');
    progress.error(err);
    status.error(err);
    output.error(err);
  }

  function promiseTask(runnerResult: Promise<TRunnerOutput>) {
    runnerResult
      .then((data) => {
        completeStreams(data);
      })
      .catch((err) => {
        errorStreams(err);
      });
    return from(runnerResult);
  }

  function observableTask(runnerResult: Observable<TRunnerOutput>) {
    runnerResult.subscribe({
      complete: () => {
        completeStreams();
      },
      error: (err) => {
        status.next('failed');
        errorStreams(err);
      },
      next: (data) => {
        output.next(data);
      },
    });
    return runnerResult;
  }

  function syncTask(runnerResult: TRunnerOutput) {
    completeStreams(runnerResult);
    return of(runnerResult);
  }

  const run = (runOptions: TRunnerOptions) => {
    status.next('started');
    try {
      const runnerResult = runner(runOptions, (update) => progress.next(update));
      if (runnerResult instanceof Promise) {
        return promiseTask(runnerResult);
      } else if (runnerResult instanceof Observable) {
        return observableTask(runnerResult);
      } else {
        return syncTask(runnerResult);
      }
    } catch (err) {
      errorStreams(err);
      return EMPTY;
    }
  };

  return {
    name,
    output,
    progress,
    run,
    status,
  };
}
