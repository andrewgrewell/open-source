import { AppProps } from 'next/app';
import Head from 'next/head';
import styled from '@emotion/styled';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { StarWarsReactBootstrap } from '@starwars/components-react';

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
        <title>StarWars Client</title>
      </Head>
      <SpeedInsights />
      <Analytics />
      <AppContainer>
        <StarWarsReactBootstrap>
          {/*<RootNav />*/}
          <Component {...pageProps} />
        </StarWarsReactBootstrap>
      </AppContainer>
    </>
  );
}

export default CustomApp;
