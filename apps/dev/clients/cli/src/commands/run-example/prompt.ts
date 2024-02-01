import prompts from 'prompts';
import Signale from 'signale';

export const command = 'prompt';
export const desc = 'Run interactive example of prompting with command';
export const builder = {};

export const handler = async () => {
  const { drink } = await prompts({
    choices: [
      {
        description: 'I like em both',
        title: 'Both',
        value: 'both',
      },
      { description: 'Caffeine!!', title: 'Coffee', value: 'coffee' },
      { description: 'Pip pip', title: 'Tea', value: 'tea' },
    ],
    initial: 0,
    message: 'What is your favorite drink?',
    name: 'drink',
    type: 'select',
  });
  Signale.success(`Prompt '${drink}' selected, example run complete`);
};
