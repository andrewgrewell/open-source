// eslint-disable-next-line @typescript-eslint/no-empty-function

const noop = () => {
  // noop
};

export const originalConsole = console;

export interface ConsoleTrapperConfig {
  onTrap?: (args: unknown[]) => unknown[];
}

export class ConsoleTrapper {
  private readonly trapper;
  private onTrapHandler;

  constructor(config: ConsoleTrapperConfig = {}) {
    this.onTrapHandler = config.onTrap || noop;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const trapperThis = this;
    this.trapper = new Proxy(originalConsole, {
      get(target, prop) {
        return (...args: unknown[]) => {
          const result = trapperThis.onTrapHandler(args);
          if (result) {
            Reflect.get(target, prop)(...(Array.isArray(result) ? result : [result]));
          }
        };
      },
    });
  }

  startTrapping() {
    global.console = this.trapper;
  }

  stopTrapping() {
    global.console = originalConsole;
  }
}
