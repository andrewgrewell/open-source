import * as admin from './admin';
import { AccessPatternConfig } from '@ag-oss/one-table';

export * from './admin';

export const gameShopsAccessPatterns = Object.entries(admin).map(([name, config]) => ({
  executor: config.executor,
  name: name,
  params: config.params,
})) as AccessPatternConfig[];
