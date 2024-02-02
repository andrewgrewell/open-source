import { wait } from '@ag-oss/timing-js';
import { isImageRunning } from '@ag-oss/docker';
import DynamoDbLocal from 'dynamo-db-local';

export const DYNAMODB_DEFAULT_PORT = 8001;

export interface DynamoDbLocalControllerOptions {
  port?: number;
}

export interface DynamoDbLocalControllerStartOptions {
  port?: number;
}

export interface SpawnResult {
  pid: number;
}

export class DynamoDbLocalController {
  private _port: number;
  private dynamodb: SpawnResult | null = null;

  get port() {
    return this._port;
  }

  constructor(options: DynamoDbLocalControllerOptions = {}) {
    this._port = options.port || DYNAMODB_DEFAULT_PORT;
  }

  async start(options: DynamoDbLocalControllerStartOptions = {}) {
    if (options.port) {
      this._port = options.port;
    }
    this.dynamodb = DynamoDbLocal.spawn({ command: 'docker', port: this.port });
    const running = await isImageRunning('amazon/dynamodb-local');
    if (!running) {
      await wait(5000);
    }
  }

  stop() {
    if (!this.dynamodb) {
      return;
    }
    process.kill(this.dynamodb.pid);
  }
}
