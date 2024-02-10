interface WaitForOptions {
  interval?: number;
  timeout?: number;
}

type ConditionCallback = () => boolean | Promise<boolean>;

export function waitFor(callback: ConditionCallback, options: WaitForOptions = {}) {
  const interval = options.interval || 1000;
  const timeout = options.timeout || interval * 10;
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const startConditionCheck = async () => {
      const done = await callback();
      if (done) {
        resolve(done);
        return;
      }
      if (Date.now() - start >= timeout) {
        reject(new Error('Timed out waiting for condition'));
        return;
      }
      setTimeout(() => {
        void startConditionCheck();
      }, interval);
    };
    void startConditionCheck();
  });
}
