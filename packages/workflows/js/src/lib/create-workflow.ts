import { CreateWorkflowOptions, TaskWorkflow } from './types';
import { forkJoin, lastValueFrom, Observable, ObservableInput } from 'rxjs';
import { merge } from 'lodash';

/**
 * Group many tasks into a "Workflow" that can be run together.
 * @param options
 */
export function createWorkflow<
  TWorkflowOptions = unknown,
  TWorkflowResult extends Record<string, ObservableInput<any>> = Record<
    string,
    ObservableInput<any>
  >,
>(
  options: CreateWorkflowOptions<TWorkflowOptions>,
): TaskWorkflow<TWorkflowOptions, TWorkflowResult> {
  const { name, tasks, baseTaskOptions } = options;
  const taskOutputs = tasks.reduce(
    (acc, task, i) => {
      acc[i] = task.output;
      return acc;
    },
    {} as Record<string, ObservableInput<any>>,
  );
  const taskResults = forkJoin(taskOutputs) as Observable<TWorkflowResult>;

  return {
    name,
    run: (options) => {
      const mergedOptions = merge({}, baseTaskOptions, options);
      const startTasks = async () => {
        for (const task of tasks) {
          try {
            await lastValueFrom(task.run(mergedOptions as never));
          } catch (e) {
            console.error(
              `Error running task '${task.name}'. Aborting workflow '${name}'`,
            );
            throw e;
          }
        }
      };
      void startTasks();
      return taskResults;
    },
    taskResults,
    tasks,
  };
}
