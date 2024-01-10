import { css } from '@emotion/react';

export const layoutCss = css`
  :root {
    --space-unit: 8;
    --page-body-height: calc(100% - var(--header-height));
    --header-height: calc(var(--space-unit) * 5px);
    --page-gutter-size: calc(var(--space-unit) * 5px);
  }
  html,
  body,
  #__next {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  main {
    //display: flex;
    //justify-content: stretch;
    //align-items: stretch;
    height: var(--page-body-height);
    //padding: var(--page-gutter-size) var(--page-gutter-size) 0 var(--page-gutter-size);
    overflow-y: auto;
  }
  .content-box {
    box-sizing: content-box;
  }
  .app {
    padding: 25px;
  }
`;
