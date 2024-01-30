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
});
