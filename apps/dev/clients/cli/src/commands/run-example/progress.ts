import { ProgressBar } from '@ag-oss/console-ui';
import { Signale } from 'signale';

import Timeout = NodeJS.Timeout;

export const command = 'progress [type]';
export const desc = 'Run interactive example of progress command';
export const builder = {
  type: {
    default: 'linear',
    required: false,
  },
};

export type TaskUpdateHandler = (data: {
  complete: boolean;
  data?: unknown;
  progress?: number;
  canceled?: boolean;
}) => void;
export type TaskErrorHandler = (error: Error) => void;
export type TaskCanceler = (error?: Error) => void;
export type Task = (
  onUpdate: TaskUpdateHandler,
  onError: TaskErrorHandler,
) => TaskCanceler;

const printStatus = new Signale({
  types: { canceled: { badge: 'X', color: 'yellow', label: 'Canceled' } },
});
const mockDownloadTask: Task = (onUpdate, onError) => {
  let canceled = false;
  const totalTicks = 100;
  let tickCount = 0;
  let scheduleTimeout: Timeout;
  const increaseTick = () => {
    if (canceled) {
      return;
    }
    tickCount += 1;
    const complete = tickCount >= totalTicks;
    onUpdate({ complete, progress: tickCount / totalTicks });
    if (!complete) {
      scheduleTimeout = setTimeout(() => {
        increaseTick();
      }, 10);
    }
  };
  const start = () => {
    scheduleTimeout = setTimeout(() => {
      increaseTick();
    }, 10);
  };
  start();
  return (error) => {
    canceled = true;
    if (error) {
      onError(error);
    } else {
      onUpdate({
        canceled: true,
        complete: true,
        progress: tickCount / totalTicks,
      });
    }
    clearTimeout(scheduleTimeout);
  };
};

export const showTaskProgress = (task: Task) => {
  const progressBar = new ProgressBar();
  progressBar.start();
  return task(
    (update) => {
      const { progress, complete, canceled } = update;
      const finalProgress = progress ?? (complete ? 1 : 0);
      progressBar.update(finalProgress);
      if (complete) {
        progressBar.stop();

        if (canceled) {
          printStatus.canceled();
        } else {
          printStatus.complete('Its done');
        }
      }
    },
    (error) => {
      progressBar.stop();
      printStatus.fatal(error.message || 'Unreported failure');
    },
  );
};

export const handler = (): void => {
  printStatus.start('Downloading some stuff');
  void showTaskProgress(mockDownloadTask);
};
