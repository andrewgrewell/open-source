import { JwtCommonOptions, TokenSigner } from '../types';

export function getTokenSignProvider(
  tokenSigner: TokenSigner,
  options: JwtCommonOptions,
) {
  return (payload: Record<string, unknown>) =>
    tokenSigner({ ...options, ...(payload || {}) });
}
