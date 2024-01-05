import { createTask } from '../lib/create-task';
import { Subject } from 'rxjs';
import { Task } from '../lib/types';

export interface CreateMockTaskOptions<TRunnerInput = unknown> {
  name: Task<TRunnerInput>['name'];
}

export type MockPromiseTask<TRunnerInput = unknown, TRunnerOutput = unknown> = Task<
  TRunnerInput,
  TRunnerOutput
>;

export type MockObservableTask<TRunnerInput = unknown, TRunnerOutput = unknown> = Task<
  TRunnerInput,
  TRunnerOutput
>;

export interface PromiseController<TRunnerOutput = unknown> {
  resolve: (value: TRunnerOutput) => void;
  reject: (e: unknown) => void;
}

export function createMockPromiseTask<TRunnerInput = void, TRunnerOutput = void>(
  options: CreateMockTaskOptions<TRunnerInput>,
) {
  const { name } = options;
  const promiseController: PromiseController<TRunnerOutput> = {
    reject: () => {
      throw new Error('Promise reject callback never set');
    },
    resolve: () => {
      throw new Error('Promise resolve callback never set');
    },
  };
  const promise = new Promise<TRunnerOutput>((resolve, reject) => {
    promiseController.resolve = resolve;
    promiseController.reject = reject;
  });
  const task: MockPromiseTask<TRunnerInput, TRunnerOutput> = createTask<
    TRunnerInput,
    TRunnerOutput
  >({
    name,
    runner: () => promise,
  });
  return {
    promise,
    promiseController,
    task,
  };
}

export function createMockObservableTask<TRunnerInput = void, TRunnerOutput = void>(
  options: CreateMockTaskOptions<TRunnerInput>,
) {
  const { name } = options;
  const outputSubject = new Subject<TRunnerOutput>();
  const task: MockObservableTask<TRunnerInput, TRunnerOutput> = createTask<
    TRunnerInput,
    TRunnerOutput
  >({
    name,
    runner: () => outputSubject.asObservable(),
  });
  return {
    outputSubject,
    task,
  };
}

export interface CreateMockProgressTaskOptions extends CreateMockTaskOptions {
  updateMessages?: string[];
  tickInterval?: number;
}

const DEFAULT_UPDATE_MESSAGES = [
  'Update 1',
  'Update 2',
  'Update 3',
  'Update 4',
  'Update 5',
];

export function createMockProgressTask(options: CreateMockProgressTaskOptions) {
  const opts = {
    tickInterval: 1000,
    updateMessages: DEFAULT_UPDATE_MESSAGES,
    ...options,
  };
  return createTask<void, void>({
    name: options.name,
    runner: (_, progress) => {
      return new Promise<void>((resolve) => {
        const tick = (updateCount: number) => {
          const isLastTick = updateCount >= opts.updateMessages.length;
          if (isLastTick) {
            progress({ completePercent: 1, message: 'Done' });
            resolve();
          } else {
            const completePercent = updateCount / opts.updateMessages.length;
            progress({
              completePercent,
              message: opts.updateMessages[updateCount],
            });
            setTimeout(() => {
              tick(updateCount + 1);
            }, opts.tickInterval);
          }
        };
        tick(0);
      });
    },
  });
}
