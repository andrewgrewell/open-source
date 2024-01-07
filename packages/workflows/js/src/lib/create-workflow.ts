import { CreateWorkflowOptions, TaskWorkflow } from './types';
import { forkJoin, lastValueFrom, Observable, ObservableInput } from 'rxjs';
import { merge } from 'lodash';

/**
 * Group many tasks into a "Workflow" that can be run together.
 * @param options
 */
export function createWorkflow<
  TWorkflowOptions extends Record<string, unknown> = Record<string, unknown>,
  TWorkflowResult extends Record<string, ObservableInput<any>> = Record<
    string,
    ObservableInput<any>
  >,
>(
  options: CreateWorkflowOptions<TWorkflowResult>,
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
        for (let i = 0; i < tasks.length; i++) {
          const task = tasks[i];
          try {
            await lastValueFrom(task.run(mergedOptions as never));
          } catch (e) {
            /* istanbul ignore next */
            console.error(
              `Error running task '${task.name}'. Aborting workflow '${name}'`,
            );
            // TODO: expose high level workflow error and add logic around how the workflow should proceed if a task errors
          }
        }
      };
      void startTasks();
      return taskResults;
    },
    taskResults,
    tasks: tasks.map((task) => ({
      name: task.name,
      output: task.output,
      progress: task.progress,
      status: task.status,
    })),
  };
}
