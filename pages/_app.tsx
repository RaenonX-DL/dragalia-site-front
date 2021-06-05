import React from 'react';

import {AppProps} from 'next/app';
import Head from 'next/head';
import {Container} from 'react-bootstrap';

import {GlobalAlert} from '../src/components/elements/common/alert';
import {Footer} from '../src/components/elements/footer';
import {Navigation} from '../src/components/elements/nav/main';
import {SiteAlert} from '../src/components/pages/siteAlert';
import {ReduxProvider} from '../src/state/provider';

import '../public/bootstrap.css';
import '../public/index.css';

// FIXME: Fetch title and description
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
