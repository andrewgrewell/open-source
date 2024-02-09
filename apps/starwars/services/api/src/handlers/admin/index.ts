import { handler as healthCheckHandler } from './health';
import { handler as migrateHandler } from './migrate';
import { createRouter, RouterRoute } from '@ez-api/lambda';

export const basePath = '/admin';

export const routes: RouterRoute[] = [
  {
    handler: healthCheckHandler,
    method: 'GET',
    path: 'health',
  },
  {
    handler: migrateHandler,
    method: 'POST',
    path: 'migrate',
  },
];

export const handler = createRouter({ basePath, routes });
