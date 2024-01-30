import { SpinnerName } from 'cli-spinners';
import ora, { Color, Ora } from 'ora';

interface SpinnerOpts {
  color?: Color;
  spinner?: SpinnerName;
}

export class Spinner {
  private spinner: Ora;

  constructor(opts: SpinnerOpts = {}) {
    this.spinner = ora({
      color: opts.color || 'yellow',
      spinner: opts.spinner,
    });
  }

  start(message: string) {
    this.spinner.start(message);
  }

  stop() {
    this.spinner.stop();
  }

  stopAndPersist(text: string, symbol?: string) {
    this.spinner.stopAndPersist({ symbol, text });
  }

  succeed(message: string) {
    this.spinner.succeed(message);
  }

  warn(message: string) {
    this.spinner.warn(message);
  }

  info(message: string) {
    this.spinner.info(message);
  }

  fail(message: string) {
    this.spinner.fail(message);
  }
}
