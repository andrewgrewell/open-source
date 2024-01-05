export interface EslintRcJson {
  extends: string[];
  ignorePatterns: string[];
  overrides: {
    files: string[];
    rules: Record<string, unknown>;
    parser: 'string';
  }[];
  parserOptions: {
    project: string[];
    tsconfigRootDir: string;
  };
  plugins: string[];
  rules: Record<string, unknown>;
}

export interface TsConfigJson {
  compilerOptions: {
    paths: Record<string, string[]>;
  };
}
