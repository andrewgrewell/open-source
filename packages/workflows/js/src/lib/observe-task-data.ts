import { Task } from './types';
import { combineLatest, of } from 'rxjs';
import { makeHot } from '@ag-oss/rxjs';

export function observeTaskData<
  TTask extends Task<unknown, unknown> = Task<unknown, unknown>,
>(task: TTask) {
  const { name, status, progress } = task;
  return combineLatest([of(name), makeHot(status), makeHot(progress)]);
}
