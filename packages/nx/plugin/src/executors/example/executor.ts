import { ExampleExecutorSchema } from './schema';

export default async function runExecutor(options: ExampleExecutorSchema) {
  console.log('Executor ran for Example', options);
  return {
    success: true,
  };
}
