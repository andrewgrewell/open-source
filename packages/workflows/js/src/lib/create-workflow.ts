import {
  CreateWorkflowOptions,
  DefaultWorkflowResult,
  DefaultWorkflowRunOptions,
  Workflow,
} from './types';
import { forkJoin, lastValueFrom, Observable } from 'rxjs';
import { merge } from 'lodash';

/**
 * Group many tasks into a "Workflow" that can be run together.
 * @param options
 */
export function createWorkflow<
  TWorkflowResult extends DefaultWorkflowResult = DefaultWorkflowResult,
  TRunOptions extends DefaultWorkflowRunOptions = DefaultWorkflowRunOptions,
>(options: CreateWorkflowOptions<TRunOptions>): Workflow<TWorkflowResult, TRunOptions> {
  const { name, tasks, runOptions } = options;
  const taskOutputs = tasks.reduce((acc, task) => {
    acc[task.name] = task.output;
    return acc;
  }, {} as DefaultWorkflowResult);
  const taskResults = forkJoin(taskOutputs) as Observable<TWorkflowResult>;

  return {
    name,
    run: (options) => {
      const mergedOptions = merge({}, runOptions, options);
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
