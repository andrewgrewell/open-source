import { css } from '@emotion/react';
import { Roboto, Varela_Round } from 'next/font/google';

const headerFont = Varela_Round({ subsets: ['latin'], weight: ['400'] });
const bodyFont = Roboto({ subsets: ['latin'], weight: ['300', '400', '900'] });

export const typographyCss = css`
  :root {
    --main-bg-color: #efefef;
    --main-text-color: #252525;
    --main-heading-color: #1e1e1e;
    --font-size-base: 16;
    --soft: 0.85rem;
    --normal: 1rem;
    --shout: 2rem;
  }

  html,
  body {
    font-size: calc(var(--font-size-base) * 1px);
    font-family: ${bodyFont.style.fontFamily};
    color: var(--main-text-color);
    font-weight: 400;
    line-height: 1.5;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${headerFont.style.fontFamily};
    font-weight: 700;
    line-height: 1.15;
    color: var(--main-heading-color);
  }

  .soft {
    font-size: var(--soft);
  }

  .soft :not(header) > p {
    font-size: 1rem;
  }

  .normal {
    font-size: var(--normal);
  }

  .normal :not(header) > p {
    //font-size: 1.25rem;
  }

  .loud {
    font-size: var(--shout);
  }

  .loud :not(header) > p {
    font-size: 1.8rem;
  }

  h1 {
    header & {
      font-size: 2.5em;
    }

    header & + p {
      font-size: 1.55em;
      line-height: 1;
    }
  }

  h2 {
    header & {
      font-size: 2em;
    }

    header & + p {
      font-size: 1.5em;
      line-height: 1;
    }
  }

  header {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: calc(var(--space-unit) * 1px);
    }
  }

  h3,
  h4,
  h5,
  h6 {
    header & {
      font-size: 1.75em;
    }

    header & + p {
      font-size: 1.35em;
    }
  }

  header {
    color: var(--main-heading-color);
  }
`;
