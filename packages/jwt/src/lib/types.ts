export interface JwtCommonOptions {
  key: string;
  expiresIn: string;
  payload?: any;
}

export interface JwtAccessOptions extends JwtCommonOptions {}

export interface JwtIdOptions extends JwtCommonOptions {}

export interface JwtRefreshOptions extends JwtCommonOptions {}

export type TokenSigner = (options: JwtCommonOptions) => Promise<string>;

export interface JwtServiceConfig {
  access: JwtAccessOptions;
  id: JwtIdOptions;
  refresh: JwtRefreshOptions;
}

export interface JwtService<
  TAccessPayload extends Record<string, unknown> = Record<string, unknown>,
  TIdPayload extends Record<string, unknown> = Record<string, unknown>,
  TRefreshPayload extends Record<string, unknown> = Record<string, unknown>,
> {
  access: {
    sign: (options: { subject: string; payload?: TAccessPayload }) => Promise<string>;
    verify: (token: string) => Promise<TAccessPayload>;
  };
  id: {
    sign: (options: { payload: TIdPayload }) => Promise<string>;
    verify: (token: string) => Promise<TIdPayload>;
  };
  refresh: {
    sign: (options?: { payload?: TRefreshPayload }) => Promise<string>;
    verify: (token: string) => Promise<TRefreshPayload>;
  };
}
