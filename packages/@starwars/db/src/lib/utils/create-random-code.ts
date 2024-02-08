import { randomInt } from 'node:crypto';

export function createRandomCode(size = 6) {
  return randomInt(0, Math.pow(10, size) - 1)
    .toString()
    .padStart(size, '0');
}
