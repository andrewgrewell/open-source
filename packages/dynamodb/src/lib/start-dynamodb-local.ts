import { waitForContainerState } from '@ag-oss/docker';
import { spawnAsync } from '@ag-oss/child-process';

export interface StartDynamodbLocalOptions {
  port?: number;
  name?: string;
  detached?: boolean;
  sharedDb?: boolean;
  inMemory?: boolean;
  silent?: boolean;
}

export async function startDynamodbLocal(options: StartDynamodbLocalOptions = {}) {
  const {
    port = 8000,
    sharedDb = true,
    inMemory = true,
    silent,
    detached = false,
    name,
  } = options;
  const args = ['run'];
  if (detached) {
    args.push('-d');
  }
  const _name = name || 'dynamodb-local';
  args.push(
    '--name',
    `${_name}`,
    '--publish',
    `${port === null ? '8000' : port}:8000`,
    '--rm',
    'amazon/dynamodb-local:latest',
    '-jar',
    'DynamoDBLocal.jar',
  );
  if (inMemory ?? true) {
    args.push('-inMemory');
  }
  if (sharedDb) {
    args.push('-sharedDb');
  }
  const runningPromise = await spawnAsync('docker', args, {
    stdio: silent ? 'ignore' : 'inherit',
  });
  if (detached) {
    return waitForContainerState(_name, 'Running');
  } else {
    return runningPromise;
  }
}
