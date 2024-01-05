import { createWorkflow } from '../create-workflow';
import { createTask } from '../create-task';
import { skip } from 'rxjs';

describe('createWorkflow', () => {
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
      const taskData = ['Data1', 'Data2'];
      type TaskData = { data: typeof taskData };
      const workflow = createWorkflow<TaskData>({
        name: 'Test Workflow',
        tasks: [
          createTask<TaskData>({
            name: 'Task 1',
            runner: (options) => `${options.data[0]} - Task 1`,
          }),
          createTask<TaskData>({
            name: 'Task 2',
            runner: (options) => `${options.data[1]} - Task 2`,
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
      const baseOptions = { baseData: 'Base Data', runData: undefined };
      const runOptions = { baseData: undefined, runData: 'Run Data' };
      type WorkflowData = { baseData: string | undefined; runData: string | undefined };
      const workflow = createWorkflow<WorkflowData>({
        baseTaskOptions: baseOptions,
        name: 'Test Workflow',
        tasks: [
          createTask<WorkflowData>({
            name: 'Task 1',
            runner: (options) =>
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
