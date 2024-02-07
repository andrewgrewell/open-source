import { verify } from 'jsonwebtoken';
import { verboseLogger as log } from '@ag-oss/logging';

export function getTokenVerifyProvider(key: string): (token: string) => Promise<any> {
  return (token: string) => {
    return new Promise((resolve, reject) => {
      verify(token, key, (err: Error | null, decoded: Record<string, unknown>) => {
        if (err) {
          reject(err);
          return;
        }
        log.verbose('Decoded JWT: ', decoded);
        resolve(decoded);
      });
    });
  };
}
