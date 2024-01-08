import { Task } from './types';
import { observeObjectValues } from '@ag-oss/rxjs';

export function observeTaskData<TTask extends Task = Task>(task: TTask) {
  return observeObjectValues(task);
}
