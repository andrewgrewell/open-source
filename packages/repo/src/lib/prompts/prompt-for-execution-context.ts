import prompts from 'prompts';
import { ExecutionContext } from '../types';

export async function promptForExecutionContext() {
  const { context } = await prompts(
    {
      choices: Object.values(ExecutionContext).map((context) => ({
        title: context,
        value: context,
      })),
      message: 'Select the execution context for this package:',
      name: 'context',
      type: 'select',
    },
    {
      onCancel: () => {
        throw new Error('Execution context is required');
      },
    },
  );
  return context;
}
