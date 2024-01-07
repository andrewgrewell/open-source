import { Task } from './types';
import { observeObjectValues } from '@ag-oss/rxjs';

export function observeTaskData<
  TTask extends Task<unknown, unknown> = Task<unknown, unknown>,
>(task: TTask) {
  return observeObjectValues(task);
}
