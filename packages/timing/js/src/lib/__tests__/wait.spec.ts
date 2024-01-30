import { wait } from '../wait';

describe('wait', function () {
  it('should resolve right away if invalid input', function () {
    const waiting = wait(-10);
    jest.runAllTimers();
    return expect(waiting).resolves.toBeUndefined();
  });

  it('should resolve after the specified time', function () {
    const waiting = wait(100);
    jest.advanceTimersByTime(101);
    return waiting.then(() => {
      expect(true).toBeTruthy();
    });
  });
});
