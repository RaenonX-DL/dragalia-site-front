import React from 'react';

import {AppProps} from 'next/app';
import Head from 'next/head';
import {Container} from 'react-bootstrap';

import {Footer} from '../src/components/elements/footer';
import {Navigation} from '../src/components/elements/nav/main';
import {SiteAlert} from '../src/components/pages/siteAlert';
import {GlobalAlert} from '../src/components/pages/stateAlert';
import {ReduxProvider} from '../src/state/provider';

import '../public/bootstrap.css';
import '../public/index.css';

// FIXME: Get title and description - how to force set title/description?
//  - Ads script enable/disable
//  - Set document title at the very beginning
const App = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <Head>
        <title>__META_TITLE__</title>
        <meta content="__META_DESCRIPTION__" name="description"/>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Navigation/>
      <SiteAlert/>
      <ReduxProvider>
        <Container className="p-3">
          <GlobalAlert/>
          <Component {...pageProps} />
        </Container>
      </ReduxProvider>
      <Footer/>
    </>
  );
};

// noinspection JSUnusedGlobalSymbols
export default App;
