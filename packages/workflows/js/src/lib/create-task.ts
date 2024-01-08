import { BehaviorSubject, EMPTY, from, Observable, of, Subject } from 'rxjs';
import {
  CreateTaskOptions,
  DefaultTaskResultData,
  DefaultTaskRunnerOptions,
  DefaultTaskUpdateData,
  Task,
  TaskProgressUpdate,
  TaskStatus,
} from './types';

export function createTask<
  TTaskResultData extends DefaultTaskResultData = DefaultTaskResultData,
  TTaskRunnerOptions extends DefaultTaskRunnerOptions = DefaultTaskRunnerOptions,
  TTaskUpdateData extends DefaultTaskUpdateData = DefaultTaskUpdateData,
>(
  options: CreateTaskOptions<TTaskResultData, TTaskRunnerOptions, TTaskUpdateData>,
): Task<TTaskResultData, TTaskRunnerOptions, TTaskUpdateData> {
  const { runner, name } = options;
  const progress = new BehaviorSubject<TaskProgressUpdate<TTaskUpdateData>>({
    completePercent: 0,
  });
  const status = new BehaviorSubject<TaskStatus>(undefined);
  const output = new Subject<TTaskResultData>();

  function completeStreams(data?: TTaskResultData) {
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

  function promiseTask(runnerResult: Promise<TTaskResultData>) {
    runnerResult
      .then((data) => {
        completeStreams(data);
      })
      .catch((err) => {
        errorStreams(err);
      });
    return from(runnerResult);
  }

  function observableTask(runnerResult: Observable<TTaskResultData>) {
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

  function syncTask(runnerResult: TTaskResultData) {
    completeStreams(runnerResult);
    return of(runnerResult);
  }

  const run: Task<TTaskResultData, TTaskRunnerOptions>['run'] = (runOptions) => {
    status.next('started');
    try {
      const runnerResult = runner({
        options: runOptions,
        sendUpdate: (update) => {
          progress.next(update);
        },
      });
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
    output: output.asObservable(),
    progress: progress.asObservable(),
    run,
    status: status.asObservable(),
  };
}
