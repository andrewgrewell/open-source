import { waitFor } from '../wait-for';

describe('waitFor', () => {
  const testOptions = {
    interval: 1,
    timeout: 10,
  };

  it('should resolve after condition is true', async function () {
    const waiting = waitFor(() => true, testOptions);
    jest.advanceTimersByTime(3);
    await waiting;
    return expect(waiting).resolves.toBeTruthy();
  });

  it('should throw if timeout hit', function () {
    const run = async () => {
      const waiting = waitFor(() => false, { ...testOptions, timeout: 3 });
      jest.advanceTimersByTime(5);
      await waiting;
    };
    return expect(() => run()).rejects.toThrow('Timed out waiting for condition');
  });

  it('should resolve after condition becomes true', async function () {
    let condition = false;
    setTimeout(() => (condition = true), 5);
    const waiting = waitFor(() => condition, testOptions);
    jest.advanceTimersByTime(6);
    await waiting;
    return expect(waiting).resolves.toBeTruthy();
  });

  it('should use default options if none are provided', async function () {
    const waiting = waitFor(() => true);
    jest.advanceTimersByTime(1000);
    await waiting;
    return expect(waiting).resolves.toBeTruthy();
  });

  it('should use default interval if not provided', async function () {
    const waiting = waitFor(() => true, { timeout: 10 });
    jest.advanceTimersByTime(1000);
    await waiting;
    return expect(waiting).resolves.toBeTruthy();
  });

  it('should use default timeout if not provided', function () {
    const waiting = waitFor(() => false, { interval: 1 });
    jest.advanceTimersByTime(10000);
    return expect(waiting).rejects.toThrow('Timed out waiting for condition');
  });
});
