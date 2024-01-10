import { ExampleExecutorSchema } from './schema';
import executor from './executor';

const options: ExampleExecutorSchema = {};

describe('Example Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
