import prompts, { PromptObject, Answers } from 'prompts';

export interface StartPromptLoopOptions {
  initialPrompt: PromptObject;
  handleResponse: (
    response: Answers<string>,
  ) =>
    | PromptObject
    | undefined
    | null
    | void
    | Promise<PromptObject | undefined | null | void>;
}
export function startPromptLoop(
  options: StartPromptLoopOptions,
): Promise<Answers<string>> {
  const { initialPrompt, handleResponse } = options;
  return new Promise((resolve, reject) => {
    const runPrompt = async (promptToRun: PromptObject): Promise<void> => {
      const response = await prompts(promptToRun);
      const nextPrompt = await handleResponse(response);
      if (nextPrompt) {
        return runPrompt(nextPrompt);
      } else {
        resolve(response);
      }
    };
    try {
      void runPrompt(initialPrompt);
    } catch (e) {
      reject(e);
    }
  });
}
