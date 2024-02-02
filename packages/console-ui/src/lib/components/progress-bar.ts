import { Presets, SingleBar } from 'cli-progress';

export class ProgressBar {
  private bar;

  constructor() {
    this.bar = new SingleBar({}, Presets.shades_classic);
  }

  start(initialProgress = 0) {
    this.bar.start(1, initialProgress);
  }

  update(progress: number) {
    this.bar.update(progress);
  }

  stop() {
    this.bar.stop();
  }
}
