import { createWorkflow } from '../create-workflow';
import { createTask } from '../create-task';
import { skip } from 'rxjs';
import { mockConsole } from '@ag-oss/logging';
import { DefaultWorkflowResult } from '../types';

describe('createWorkflow', () => {
  const consoleMock = mockConsole(console);

  afterEach(() => {
    consoleMock.clearAll();
  });

  it('should set the name of the workflow', () => {
    const name = 'Test Workflow';
    const workflow = createWorkflow({
      name,
      tasks: [],
    });
    expect(workflow.name).toEqual(name);
  });

  it('should run all tasks and expose results', () => {
    return new Promise((resolve, reject) => {
      const taskData = ['Data1', 'Data2'] as const;
      type TaskOptions = { data: typeof taskData };
      type WorkflowResult = { 'Task 1': string; 'Task 2': string };
      const workflow = createWorkflow<WorkflowResult>({
        name: 'Test Workflow',
        tasks: [
          createTask<string, TaskOptions>({
            name: 'Task 1',
            runner: ({ options }) => `${options.data[0]} - Task 1`,
          }),
          createTask<string, TaskOptions>({
            name: 'Task 2',
            runner: ({ options }) => `${options.data[1]} - Task 2`,
          }),
        ],
      });
      workflow.taskResults.pipe(skip(1)).subscribe({
        complete: () => {
          resolve(null);
        },
        next: (results) => {
          try {
            expect(results['Task 1']).toEqual('Data1 - Task 1');
            expect(results['Task 2']).toEqual('Data2 - Task 2');
          } catch (e) {
            reject(e);
          }
        },
      });
      workflow.run({ data: ['Data1', 'Data2'] });
    });
  });

  it('should merge base options and run options', () => {
    return new Promise((resolve, reject) => {
      type WorkflowOptions = {
        baseData: string | undefined;
        runData: string | undefined;
      };
      const baseOptions: WorkflowOptions = { baseData: 'Base Data', runData: undefined };
      const runOptions: WorkflowOptions = { baseData: undefined, runData: 'Run Data' };
      const workflow = createWorkflow<DefaultWorkflowResult, WorkflowOptions>({
        name: 'Test Workflow',
        runOptions: baseOptions,
        tasks: [
          createTask<string, WorkflowOptions>({
            name: 'Task 1',
            runner: ({ options }) =>
              Promise.resolve(`${options.baseData}|${options.runData} - Task 1`),
          }),
        ],
      });
      workflow.taskResults.pipe(skip(1)).subscribe({
        complete: () => {
          resolve(null);
        },
        next: (results) => {
          try {
            expect(results['Task 1']).toEqual(
              `${baseOptions.baseData}|${runOptions.runData} - Task 1`,
            );
          } catch (e) {
            reject(e);
          }
        },
      });
      workflow.run(runOptions);
    });
  });
});
