import { Observable } from 'rxjs';

export interface CreateTaskOptions<
  TRunnerOptions = Record<string, unknown> | undefined,
  TTaskData = unknown,
> {
  name: string;
  runner: (
    options: TRunnerOptions,
    sendUpdate: TaskUpdateCallback,
  ) => Promise<TTaskData> | Observable<TTaskData> | TTaskData;
}

export type TaskUpdateCallback = (update: TaskProgressUpdate) => void;

export type TaskStatus = undefined | 'started' | 'completed' | 'failed';

export interface TaskProgressUpdate {
  /**
   * value between 0 and 100
   */
  completePercent?: number;
  /**
   * Message relating to the current progress
   */
  message?: string;
  // TODO: support passing in data to allow for more complex progress updates
}

export interface Task<
  TRunnerOptions = Record<string, unknown> | undefined,
  TRunnerOutput = any,
> {
  name: string;
  status: Observable<TaskStatus>;
  progress: Observable<TaskProgressUpdate>;
  output: Observable<TRunnerOutput>;
  run: (options: TRunnerOptions) => Observable<TRunnerOutput>;
}

/**
 * A task exposed by a workflow
 * @note: the run method is not exposed as it is handled by the workflow
 */
export interface WorkflowTask<TRunnerOutput = any> {
  name: string;
  status: Observable<TaskStatus>;
  progress: Observable<TaskProgressUpdate>;
  output: Observable<TRunnerOutput>;
}

export interface CreateWorkflowOptions<TWorkflowOptions = unknown> {
  /**
   * The name is often displayed in UI to identify the workflow.
   */
  name: string;
  /**
   * Array of tasks to run.
   */
  tasks: Task<TWorkflowOptions | void>[];
  /**
   * Provide a base set of options to be passed to each task.
   * These options will be merged with the run options, with the run options taking precedence.
   */
  baseTaskOptions?: unknown;
}

export interface TaskWorkflow<
  TWorkflowOptions = any,
  TWorkflowResult = Record<string, unknown>,
> {
  /**
   * The name of the workflow.
   */
  name: string;
  /**
   * Array of tasks to run.
   */
  tasks: WorkflowTask<TWorkflowResult>[];
  /**
   * Observable which emits a record of the result of each task, where the key is the task name.
   */
  taskResults: Observable<TWorkflowResult>;
  /**
   * Run all tasks of the workflow.
   * @param options
   * @returns Observable which will complete with a record of the result of each task, where the key is the task name.
   */
  run: (options?: Partial<TWorkflowOptions>) => Observable<TWorkflowResult>;
}

export type FileBuilder<TConfig = Record<any, unknown>> = (
  config: TConfig,
) => object | string | undefined | void;

export interface FileBuilderMap<TConfig = Record<any, unknown>> {
  [key: string]: FileBuilder<TConfig>;
}

export type FileBuilderMapBuilder<TConfig = Record<any, unknown>> = (
  config: TConfig,
) => FileBuilderMap<TConfig>;
