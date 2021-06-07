import React from 'react';

import App, {AppProps, AppContext, AppInitialProps as NextAppInitialProps} from 'next/app';
import Head from 'next/head';
import {Container} from 'react-bootstrap';

import {Footer} from '../src/components/elements/footer';
import {Navigation} from '../src/components/elements/nav/main';
import {SiteAlert} from '../src/components/pages/siteAlert';
import {GlobalAlert} from '../src/components/pages/stateAlert';
import {AppReactContext} from '../src/context/app/main';
import {AppReactContextValue} from '../src/context/app/types';
import {useI18n} from '../src/i18n/hook';
import {ReduxProvider} from '../src/state/provider';
import {getPageMeta} from '../src/utils/meta/main';
import Error404 from './404';

import '../public/bootstrap.css';
import '../public/index.css';


type PageProps = {
  title: string,
  description: string,
  isNotFound: boolean,
}

// `pageProps` from `AppInitialProps` of `next/app` is `any`, weakening the type check
type AppInitialProps = NextAppInitialProps & {
  pageProps: PageProps
};

const NextApp = ({Component, pageProps}: AppProps<PageProps>) => {
  const {t} = useI18n();

  const appContextValue: AppReactContextValue = {
    title: pageProps.title,
    description: pageProps.description,
  };

  // Page meta must be obtained here, or page preview won't work
  return (
    <>
      <Head>
        <title>{pageProps.title}{t((t) => t.meta.suffix)}</title>
        <meta content={pageProps.description} name="description"/>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <AppReactContext.Provider value={appContextValue}>
        <Navigation/>
        <SiteAlert/>
        <ReduxProvider>
          {
            pageProps.isNotFound ?
              <Error404/> :
              <Container className="p-3">
                <GlobalAlert/>
                <Component {...pageProps} />
              </Container>
          }
        </ReduxProvider>
        <Footer/>
      </AppReactContext.Provider>
    </>
  );
};

NextApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps> => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext) as AppInitialProps;

  // FIXME: Get page meta already included showAds and isAdmin
  appProps.pageProps = {
    ...await getPageMeta(appContext),
    isNotFound: appContext.ctx.res?.statusCode === 404,
  };

  return {...appProps};
};

export default NextApp;
