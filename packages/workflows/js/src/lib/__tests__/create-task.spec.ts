import { createTask } from '../create-task';
import { Subject } from 'rxjs';

type StringTaskOptions = { taskInput: string };

describe('createTask', () => {
  describe('Common Functionality', () => {
    it('should set the name of the task', () => {
      const name = 'Test Task';
      const task = createTask({
        name,
        runner: () => undefined,
      });
      expect(task.name).toEqual(name);
    });

    it('should support progress updates', () => {
      const name = 'Test Task';
      const update = { completePercent: 0.5, message: 'Calibrating the GigaSpanner' };
      const task = createTask<void>({
        name,
        runner: ({ sendUpdate }) => {
          sendUpdate(update);
        },
      });
      const updateSpy = jest.fn();
      task.progress.subscribe(updateSpy);
      task.run();
      expect(updateSpy).toHaveBeenCalledWith(update);
    });
  });

  describe('Synchronous Task Runner', () => {
    it('should emit task result on run observable', () => {
      const taskInput = 'test';
      const task = createTask<string, StringTaskOptions>({
        name: 'Test Task',
        runner: ({ options }) => options.taskInput,
      });
      const spy = jest.fn();
      task.run({ taskInput }).subscribe(spy);
      expect(spy).toHaveBeenCalledWith('test');
    });

    it('should emit task result on output observable', () => {
      const taskInput = 'testing123';
      const task = createTask<string, StringTaskOptions>({
        name: 'Test Task',
        runner: ({ options }) => options.taskInput,
      });
      const spy = jest.fn();
      task.output.subscribe(spy);
      task.run({ taskInput });
      expect(spy).toHaveBeenCalledWith(taskInput);
    });

    it('should emit expected status after calling run', () => {
      const task = createTask<void, void>({
        name: 'Test Task',
        runner: () => undefined,
      });
      const spy = jest.fn();
      task.status.subscribe(spy);
      task.run();
      expect(spy).toHaveBeenNthCalledWith(1, undefined);
      expect(spy).toHaveBeenNthCalledWith(2, 'started');
      expect(spy).toHaveBeenNthCalledWith(3, 'completed');
    });

    it('should emit "failed" status if error', () => {
      const testError = new Error('test');
      const task = createTask<void>({
        name: 'Test Task',
        runner: () => {
          throw testError;
        },
      });
      const nextSpy = jest.fn();
      const errorSpy = jest.fn();
      task.status.subscribe({
        error: errorSpy,
        next: nextSpy,
      });
      task.run();
      expect(nextSpy).toHaveBeenLastCalledWith('failed');
      expect(errorSpy).toHaveBeenLastCalledWith(testError);
    });

    it('should complete all streams when complete', () => {
      const taskInput = 'testing123';
      const task = createTask<string, StringTaskOptions>({
        name: 'Test Task',
        runner: ({ options }) => options.taskInput,
      });
      const statusSpy = jest.fn();
      const outputSpy = jest.fn();
      const progressSpy = jest.fn();
      task.status.subscribe({ complete: statusSpy });
      task.output.subscribe({ complete: outputSpy });
      task.progress.subscribe({ complete: progressSpy });
      task.run({ taskInput });
      expect(statusSpy).toHaveBeenCalled();
      expect(outputSpy).toHaveBeenCalled();
      expect(progressSpy).toHaveBeenCalled();
    });
  });

  describe('Promise Task Runner', () => {
    it('should emit task result on run observable', async () => {
      const taskOutput = 'test';
      const taskPromise = Promise.resolve(taskOutput);
      const task = createTask<string>({
        name: 'Test Task',
        runner: () => taskPromise,
      });
      const spy = jest.fn();
      task.run().subscribe(spy);
      await taskPromise;
      expect(spy).toHaveBeenCalledWith(taskOutput);
    });

    it('should emit task result on output observable', async () => {
      const taskOutput = 'test';
      const taskPromise = Promise.resolve(taskOutput);
      const task = createTask<string>({
        name: 'Test Task',
        runner: () => taskPromise,
      });
      const spy = jest.fn();
      task.output.subscribe(spy);
      task.run();
      await taskPromise;
      expect(spy).toHaveBeenCalledWith(taskOutput);
    });

    it('should emit expected status after calling run', async () => {
      const resultPromise = Promise.resolve();
      const task = createTask<void>({
        name: 'Test Task',
        runner: () => resultPromise,
      });
      const spy = jest.fn();
      task.status.subscribe(spy);
      task.run();
      await resultPromise;
      expect(spy).toHaveBeenNthCalledWith(1, undefined);
      expect(spy).toHaveBeenNthCalledWith(2, 'started');
      expect(spy).toHaveBeenNthCalledWith(3, 'completed');
      expect(spy).toHaveBeenCalledTimes(3);
    });

    it('should emit "failed" status if error', async () => {
      const failedPromise = Promise.reject('test-error');
      const task = createTask<void>({
        name: 'Test Task',
        runner: () => failedPromise,
      });
      const nextSpy = jest.fn();
      const errorSpy = jest.fn();
      task.status.subscribe({
        error: errorSpy,
        next: nextSpy,
      });
      task.run();
      try {
        await failedPromise;
        expect(nextSpy).toHaveBeenLastCalledWith('failed');
        expect(errorSpy).toHaveBeenLastCalledWith('test-error');
      } catch (e) {
        // need to catch awaiting the failing promise or the test will fail
      }
    });

    it('should complete all streams when complete', async () => {
      const failedPromise = Promise.reject('test-error');
      const task = createTask<void>({
        name: 'Test Task',
        runner: () => failedPromise,
      });
      const statusSpy = jest.fn();
      const outputSpy = jest.fn();
      const progressSpy = jest.fn();
      task.status.subscribe({ complete: statusSpy });
      task.output.subscribe({ complete: outputSpy });
      task.progress.subscribe({ complete: progressSpy });
      task.run();
      try {
        await failedPromise;
        expect(statusSpy).toHaveBeenCalled();
        expect(outputSpy).toHaveBeenCalled();
        expect(progressSpy).toHaveBeenCalled();
      } catch (e) {
        // need to catch awaiting the failing promise or the test will fail
      }
    });
  });

  describe('Observable Task Runner', () => {
    it('should emit task result on run observable', async () => {
      const taskOutput = new Subject<number>();
      const task = createTask<number>({
        name: 'Test Task',
        runner: () => taskOutput,
      });
      const spy = jest.fn();
      task.run().subscribe(spy);
      taskOutput.next(1);
      taskOutput.next(2);
      expect(spy).toHaveBeenNthCalledWith(1, 1);
      expect(spy).toHaveBeenNthCalledWith(2, 2);
    });

    it('should emit task result on output observable', async () => {
      const taskOutput = new Subject<string>();
      const task = createTask<string>({
        name: 'Test Task',
        runner: () => taskOutput,
      });
      const spy = jest.fn();
      task.output.subscribe(spy);
      task.run();
      taskOutput.next('first');
      taskOutput.next('second');
      expect(spy).toHaveBeenNthCalledWith(1, 'first');
      expect(spy).toHaveBeenNthCalledWith(2, 'second');
    });

    it('should emit expected status after calling run', async () => {
      const taskOutput = new Subject<string>();
      const task = createTask<string>({
        name: 'Test Task',
        runner: () => taskOutput,
      });
      const spy = jest.fn();
      task.status.subscribe(spy);
      task.run();
      expect(spy).toHaveBeenNthCalledWith(1, undefined);
      expect(spy).toHaveBeenNthCalledWith(2, 'started');
      taskOutput.complete();
      expect(spy).toHaveBeenNthCalledWith(3, 'completed');
      expect(spy).toHaveBeenCalledTimes(3);
    });

    it('should emit "failed" status if error', async () => {
      const taskOutput = new Subject<string>();
      const task = createTask<string>({
        name: 'Test Task',
        runner: () => taskOutput,
      });
      const nextSpy = jest.fn();
      const errorSpy = jest.fn();
      task.status.subscribe({
        error: errorSpy,
        next: nextSpy,
      });
      task.run();
      taskOutput.error('test-error');
      expect(nextSpy).toHaveBeenLastCalledWith('failed');
      expect(errorSpy).toHaveBeenLastCalledWith('test-error');
    });

    it('should complete all streams when complete', async () => {
      const taskOutput = new Subject<string>();
      const task = createTask<string>({
        name: 'Test Task',
        runner: () => taskOutput,
      });
      const statusSpy = jest.fn();
      const outputSpy = jest.fn();
      const progressSpy = jest.fn();
      task.status.subscribe({ complete: statusSpy });
      task.output.subscribe({ complete: outputSpy });
      task.progress.subscribe({ complete: progressSpy });
      task.run();
      taskOutput.complete();
      expect(statusSpy).toHaveBeenCalled();
      expect(outputSpy).toHaveBeenCalled();
      expect(progressSpy).toHaveBeenCalled();
    });
  });
});
