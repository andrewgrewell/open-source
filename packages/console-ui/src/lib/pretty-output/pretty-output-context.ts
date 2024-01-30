import { ConsoleTrapper } from '../console-trapper';
import { Spinner } from '../components';
import { PrettyOutputContextOptions, WithPrettyOutputOptions } from '../types';
import * as readline from 'readline';
import { Signale } from 'signale';

// TODO: Add utilities for common output formatting
/*
  - Tables
  - Lists
  - Progress bars (single and stacked)
  - Indentation
  - Colors
  - Icons
  - Emoji
  - Object formatting
  - Output to file
  - Masking sensitive data
  - Clickable links
  - Opening browser windows and getting output from window
 */
export class PrettyOutputContext {
  private consoleTrapper: ConsoleTrapper;
  spinner: Spinner;
  signale: Signale;

  constructor(options: PrettyOutputContextOptions) {
    this.consoleTrapper = new ConsoleTrapper({
      onTrap: this.handleTrappedLog,
    });
    this.consoleTrapper.startTrapping();
    this.spinner = new Spinner(options.spinnerOptions);
    // TODO customize the look of this
    this.signale = new Signale(options.signaleOptions);
  }

  handleTrappedLog(args: unknown[]) {
    // reset cursor to beginning of line since often there will be progress indicators
    readline.cursorTo(process.stdout, 0);
    readline.clearLine(process.stdout, 0);
    return args;
  }
}

const prettyOutputContextMap: Record<string, PrettyOutputContext> = {};

export function createPrettyOutputContext(options: WithPrettyOutputOptions) {
  const optionsHash = JSON.stringify(options);
  let context = prettyOutputContextMap[optionsHash];
  if (!context) {
    context = new PrettyOutputContext(options);
    prettyOutputContextMap[optionsHash] = context;
  }
  return context;
}
