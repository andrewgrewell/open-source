import { layoutCss } from './layout.css';
import { resetCss } from './reset.css';
import { typographyCss } from './typography.css';
import { Global } from '@emotion/react';

export const GlobalStyles = () => (
  <Global styles={[layoutCss, resetCss, typographyCss]} />
);
