import { Observable } from 'rxjs';

export type DefaultTaskResultData = void | unknown;
export type DefaultTaskUpdateData = void | unknown;
export type DefaultTaskRunnerOptions = Record<PropertyKey, any> | void;

export interface TaskProgressUpdate<TData = DefaultTaskUpdateData> {
  /**
   * Data relating to the current progress
   */
  data?: TData;
  /**
   * Message relating to the current progress
   */
  message?: string;
  /**
   * value between 0 and 100
   */
  completePercent?: number;
}

/**
 * Allows task runners to emit progress updates
 */
export type TaskUpdateCallback<TData = DefaultTaskUpdateData> = (
  update: TaskProgressUpdate<TData>,
) => void;

/**
 * The result of a task runner
 */
export type TaskRunnerResult<TTaskResultData = DefaultTaskResultData> =
  | Promise<TTaskResultData>
  | Observable<TTaskResultData>
  | TTaskResultData;

export interface TaskRunnerOptions<
  TTaskRunnerOptions extends DefaultTaskUpdateData = DefaultTaskRunnerOptions,
  TTaskUpdateData extends DefaultTaskUpdateData = DefaultTaskUpdateData,
> {
  /**
   * Callback for emitting progress updates
   */
  sendUpdate: TaskUpdateCallback<TTaskUpdateData>;
  /**
   * The options if any that were passed in to task.run()
   */
  options: TTaskRunnerOptions;
}

/**
 * A function which provides that actual functionality of the Task
 */
export type TaskRunner<
  TTaskResultData = DefaultTaskResultData,
  TTaskRunnerOptions = DefaultTaskRunnerOptions,
  TTaskUpdateData = DefaultTaskUpdateData,
> = (
  options: TaskRunnerOptions<TTaskRunnerOptions, TTaskUpdateData>,
) => TaskRunnerResult<TTaskResultData>;

/**
 * Options used to create a task
 */
export interface CreateTaskOptions<
  TTaskResultData = DefaultTaskResultData,
  TTaskRunnerOptions = DefaultTaskRunnerOptions,
  TTaskUpdateData = DefaultTaskUpdateData,
> {
  name: string;
  runner: TaskRunner<TTaskResultData, TTaskRunnerOptions, TTaskUpdateData>;
}

/**
 * Status exposed by the task
 */
export type TaskStatus = undefined | 'started' | 'completed' | 'failed';

export type TaskRunOutput<TTaskResultData = DefaultTaskResultData> =
  Observable<TTaskResultData>;

/**
 * A Task represents a discrete unit of work which can be observed.
 * @note currently tasks can only be ran, but this will likely be updated in the future to support cancelling, etc.
 */
export interface Task<
  TTaskResultData extends DefaultTaskResultData = DefaultTaskResultData,
  TTaskRunnerOptions extends DefaultTaskRunnerOptions = DefaultTaskRunnerOptions,
  TTaskUpdateData extends DefaultTaskUpdateData = DefaultTaskUpdateData,
> {
  name: string;
  status: Observable<TaskStatus>;
  progress: Observable<TaskProgressUpdate<TTaskUpdateData>>;
  output: TaskRunOutput<TTaskResultData>;
  run: (options: TTaskRunnerOptions) => TaskRunOutput<TTaskResultData>;
}

export type DefaultWorkflowResult = Record<PropertyKey, any>;
export type DefaultWorkflowRunOptions = Record<PropertyKey, any> | void;

export interface CreateWorkflowOptions<
  TRunOptions extends DefaultTaskRunnerOptions = DefaultTaskRunnerOptions,
> {
  /**
   * The name is often displayed in UI to identify the workflow.
   */
  name: string;
  /**
   * Array of tasks to run.
   */
  tasks: Task<any, any, any>[];
  /**
   * Provide a base set of options to be passed to each task.
   * These options will be merged with the run options, with the run options taking precedence.
   */
  runOptions?: Partial<TRunOptions>;
}

/**
 * A task exposed by a workflow
 * @note: the run method is not exposed as it is handled by the workflow
 */
export type WorkflowTask = Omit<Task, 'run'>;

export interface Workflow<
  TWorkflowResult extends DefaultWorkflowResult = DefaultWorkflowResult,
  TRunOptions extends DefaultWorkflowRunOptions = DefaultWorkflowRunOptions,
> {
  /**
   * The name of the workflow.
   */
  name: string;
  /**
   * Array of WorkflowTasks of the workflow.
   */
  tasks: WorkflowTask[];
  /**
   * Observable which emits a record of the result of each task, where the key is the task name.
   */
  taskResults: Observable<TWorkflowResult>;
  /**
   * Run all tasks of the workflow.
   * @param options
   * @returns Observable which will complete with a record of the result of each task, where the key is the task name.
   */
  run: (options: TRunOptions) => Observable<TWorkflowResult>;
}

// TODO move these and all types into a workflows-types package
//  otherwise it's a little awkward exposing these types here when they are technically used by the node package
//  (but shouldn't be coupled to that package execution context)
export type FileBuilder<TConfig = Record<any, unknown>> = (
  config: TConfig,
) => object | string | undefined | void;

export interface FileBuilderMap<TConfig = Record<any, unknown>> {
  [key: string]: FileBuilder<TConfig>;
}

export type FileBuilderMapBuilder<TConfig = Record<any, unknown>> = (
  config: TConfig,
) => FileBuilderMap<TConfig>;
