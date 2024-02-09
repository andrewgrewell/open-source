export type PositionalOptionsType = 'string' | 'number' | 'boolean';

export interface CommandBuilder {
  [key: string]: {
    alias?: string;
    default?: string | boolean;
    describe?: string;
    type?: PositionalOptionsType;
    required?: boolean;
  };
}

export interface DevCliConfig {
  root: string;
  commandDir: string;
}
