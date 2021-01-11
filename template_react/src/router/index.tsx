import Home from '@/pages/Home';

import type { RouteConfig } from './index.d';

export type { RouteConfig };
export { renderRoutes } from './renderRoutes';

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
  },
];
