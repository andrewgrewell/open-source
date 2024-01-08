import { observeTaskData } from '../observe-task-data';
import { Task, TaskProgressUpdate, TaskStatus } from '../types';
import { BehaviorSubject, of } from 'rxjs';
import { nextValuePromise } from '@ag-oss/rxjs';

describe('observeTaskData', () => {
  it('should return an observable of task data', async () => {
    const progressSubject = new BehaviorSubject<TaskProgressUpdate>({
      completePercent: 100,
      message: 'done',
    });
    const statusSubject = new BehaviorSubject<TaskStatus>('completed');
    const task: Task = {
      name: 'test-task',
      output: of(1),
      progress: progressSubject.asObservable(),
      run: jest.fn(),
      status: statusSubject.asObservable(),
    };
    const result = await nextValuePromise(observeTaskData(task as never));
    expect(result).toEqual({
      name: 'test-task',
      output: 1,
      progress: {
        completePercent: 100,
        message: 'done',
      },
      run: expect.any(Function),
      status: 'completed',
    });
  });
});
