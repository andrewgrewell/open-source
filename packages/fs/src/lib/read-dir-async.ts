/* istanbul ignore file */
import { readdir } from 'fs';
import { promisify } from 'util';

export const readDirAsync = promisify(readdir);
