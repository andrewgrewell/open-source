import { verboseLogger } from '@ag-oss/logging';

export function handleProcessExit(
  callback: (code?: number, signal?: string, error?: Error) => void,
) {
  let called = false;
  process.on('beforeExit', async (code) => {
    if (called) {
      return;
    }
    verboseLogger.verbose('beforeExit', code);
    called = true;
    await callback(code);
  });
  process.on('exit', (code) => {
    if (called) {
      return;
    }
    called = true;
    verboseLogger.verbose('exit', code);
    callback(code);
  });
  process.on('SIGINT', () => {
    if (called) {
      return;
    }
    called = true;
    verboseLogger.verbose('SIGINT');
    callback(undefined, 'SIGINT');
  });
  process.on('SIGTERM', () => {
    if (called) {
      return;
    }
    called = true;
    verboseLogger.verbose('SIGTERM');
    callback(undefined, 'SIGTERM');
  });
  process.on('uncaughtException', (err) => {
    if (called) {
      return;
    }
    called = true;
    verboseLogger.verbose('SIGTERM');
    callback(undefined, undefined, err);
  });
}
