export const command = 'throw [message]';
export const desc = 'Run interactive example of throwing in command';
export const builder = {
  message: {
    default: 'Barf',
    required: false,
  },
};
export interface Args {
  message?: string;
}

export const handler = (args: Args): void => {
  throw new Error(args.message);
};
