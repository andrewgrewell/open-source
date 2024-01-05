import { exec, ExecOptions } from 'child_process';
import { promisify } from 'util';

export type ExecAsyncOptions = ExecOptions;

export const execAsync = promisify(exec);
