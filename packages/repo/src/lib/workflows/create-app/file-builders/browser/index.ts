import { ProjectFileBuilderMap } from '../../../../types';
import { commonFileBuilders } from '../common';

export const browserFileBuilders: ProjectFileBuilderMap = {
  ...commonFileBuilders,
  'index.d.ts': () => '',
  'layouts/root-nav/index.ts': () => '',
  'layouts/root-nav/root-nav.styles.tsx': () => '',
  'layouts/root-nav/root-nav.tsx': () => '',
  'layouts/root-nav/root-nav.types.ts': () => '',
  'next-env.d.ts': () => '',
  'next.config.js': () => '',
  'pages/_app.tsx': () => '',
  'pages/_document.tsx': () => '',
  'pages/index.tsx': () => '',
  'proxy.conf.json': () => '',
  'public/.gitkeep': () => '',
};
