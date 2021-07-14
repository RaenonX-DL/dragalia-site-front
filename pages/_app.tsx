import React from 'react';

import {getSession} from 'next-auth/client';
import App, {AppContext, AppInitialProps as NextAppInitialProps, AppProps} from 'next/app';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';

import '../public/bootstrap.css';
import '../public/index.css';

import {Footer} from '../src/components/elements/footer';
import {Navigation} from '../src/components/elements/nav/main';
import {SiteAlert} from '../src/components/pages/siteAlert';
import {GlobalAlert} from '../src/components/pages/stateAlert';
import {AppReactContext} from '../src/context/app/main';
import {AppReactContextValue} from '../src/context/app/types';
import {useI18n} from '../src/i18n/hook';
import {ReduxProvider} from '../src/state/provider';
import {getPageMeta} from '../src/utils/meta/main';
import {ResourceLoader} from '../src/utils/services/resources/loader';
import Error404 from './404';


type PageProps = AppReactContextValue & {
  isNotFound: boolean,
}

// `pageProps` from `AppInitialProps` of `next/app` is `any`, weakening the type check
type AppInitialProps = NextAppInitialProps & {
  pageProps: PageProps
};

const NextApp = ({Component, pageProps}: AppProps<PageProps>) => {
  const {t} = useI18n();

  // Page meta must be obtained here, or page preview won't work
  return (
    <>
      <Head>
        <title>{pageProps.title}{t((t) => t.meta.suffix)}</title>
        <meta content={pageProps.description} name="description"/>

        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

        {/* Google AdSense */}
        {
          !pageProps.session?.user.adsFreeExpiry &&
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
        }
      </Head>
      <AppReactContext.Provider value={{...pageProps}}>
        <ReduxProvider>
          <Navigation/>
          <SiteAlert/>
          {
            pageProps.isNotFound ?
              <Error404/> :
              <Container className="p-3">
                <GlobalAlert/>
                <Component {...pageProps} />
              </Container>
          }
          <Footer/>
        </ReduxProvider>
      </AppReactContext.Provider>
    </>
  );
};

NextApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps> => {
  // Call page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext) as AppInitialProps;
  const session = await getSession(appContext.ctx);

  // Taking this variable out to force type checking on `pageProps`
  // noinspection UnnecessaryLocalVariableJS
  const pageProps: PageProps = {
    ...await getPageMeta(appContext),
    isNotFound: appContext.ctx.res?.statusCode === 404,
    session,
    simpleUnitInfo: await ResourceLoader.getSimpleUnitInfo(),
  };

  appProps.pageProps = pageProps;

  return appProps;
};

export default NextApp;
