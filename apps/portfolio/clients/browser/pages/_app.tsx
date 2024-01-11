import { AppProps } from 'next/app';
import Head from 'next/head';
import { SITE_TITLE } from '../constants';
import styled from '@emotion/styled';
import { GlobalStyles } from '../styles/global-styles';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const AppContainer = styled.main`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <GlobalStyles />
      <SpeedInsights />
      <Analytics />
      <AppContainer>
        {/*<RootNav />*/}
        <Component {...pageProps} />
      </AppContainer>
    </>
  );
}

export default CustomApp;
