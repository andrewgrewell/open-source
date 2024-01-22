import { StyledRootNav } from './root-nav.styles';
import { RootNavProps } from './root-nav.types';
import Link from 'next/link';
import React, { FC } from 'react';

export const rootNavTestId = 'root-nav';

export const RootNav: FC<RootNavProps> = (props) => {
  const { children } = props;
  return (
    <StyledRootNav data-testid={rootNavTestId}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {/*<li>*/}
        {/*  <Link href="/blog">Blog</Link>*/}
        {/*</li>*/}
      </ul>
      {children}
    </StyledRootNav>
  );
};
