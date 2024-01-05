export interface SubProcessExecution {
  command: string;
  args?: string[];
  stdout: any; // TODO
  stderr: any;
  stdin: any;
  statusCode: any;
  complete: Promise<void>;
}

export function trackSubProcessExecution(
  command: string,
  args?: string[],
): SubProcessExecution {
  return {
    args,
    command,
    complete: Promise.resolve(),
    statusCode: null,
    stderr: null,
    stdin: null,
    stdout: null,
  };
}
