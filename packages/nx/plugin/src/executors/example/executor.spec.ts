import { ExampleExecutorSchema } from './schema';
import executor from './executor';
import { mockConsole } from '@ag-oss/logging';

const options: ExampleExecutorSchema = {};

describe('Example Executor', () => {
  mockConsole(console);
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
