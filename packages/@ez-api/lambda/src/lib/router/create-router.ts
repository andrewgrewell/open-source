/* istanbul ignore file */
import middy from '@middy/core';
import { MiddyMiddleware, MiddyRoute, RouterRoute } from '../types';
import httpRouterHandler from '@middy/http-router';
import { addLeadingChar, removeTrailingChar } from '@ag-oss/strings';

export interface CreateHandlerRouterOptions {
  basePath?: string;
  routes: RouterRoute[];
  middleware?: MiddyMiddleware;
}

export function createRouter(options?: CreateHandlerRouterOptions) {
  const { basePath = '', routes, middleware } = options || {};
  const parsedRoutes = parseRoutes(basePath, routes);
  if (!middleware) {
    return middy().handler(httpRouterHandler(parsedRoutes));
  }
  return middy().use(middleware).handler(httpRouterHandler(parsedRoutes));
}

function parseRoutes(basePath = '', routes: RouterRoute[]): MiddyRoute[] {
  const base = removeTrailingChar(addLeadingChar(basePath, '/'), '/');
  return routes?.map((route) => {
    const { path, method, handler } = route;
    return {
      handler,
      method,
      path: `${base}${addLeadingChar(path, '/')}`,
    };
  });
}
