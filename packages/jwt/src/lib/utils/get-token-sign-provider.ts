import { JwtCommonOptions, TokenSigner } from '../types';
import { merge } from 'lodash';

export function getTokenSignProvider(
  tokenSigner: TokenSigner,
  options: JwtCommonOptions,
) {
  return (payload: Record<string, unknown>) => {
    return tokenSigner(merge({}, options, payload || {}));
  };
}
