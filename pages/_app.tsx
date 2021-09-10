import React from 'react';

import {getSession} from 'next-auth/client';
import App, {AppContext, AppInitialProps as NextAppInitialProps, AppProps} from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import Container from 'react-bootstrap/Container';

import '../styles/bootstrap.css';
import '../styles/bsIcons.css';
import '../styles/index.css';
import '../styles/scrollbar.scss';
import '../styles/section.css';
import {isProduction} from '../server/utils/misc';
import {Footer} from '../src/components/elements/footer';
import {Error404} from '../src/components/error/404';
import {Navigation} from '../src/components/nav/main';
import {SiteAlert} from '../src/components/pages/siteAlert';
import {GlobalAlert} from '../src/components/pages/stateAlert';
import {AppReactContext} from '../src/context/app/main';
import {AppReactContextValue} from '../src/context/app/types';
import {useI18n} from '../src/i18n/hook';
import {ReduxProvider} from '../src/state/provider';
import {getPageMeta} from '../src/utils/meta/main';
import {ResourceLoader} from '../src/utils/services/resources/loader';


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

        {/* Global site tag (gtag.js) - Google Analytics */}
        {
          isProduction() &&
          !process.env.CI &&
          <>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-796E69CFJG"/>
            <script dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              
              function gtag(){dataLayer.push(arguments);}
              
              gtag('js', new Date());
              gtag('config', 'G-796E69CFJG');
              `,
            }}/>
          </>
        }
        {/* Google AdSense */}
        {
          !pageProps.session?.user.adsFreeExpiry &&
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
        }
        {/* New Relic EUM header */}
        {
          isProduction() &&
          <script async type="text/javascript" src="/js/newRelicEum.js"/>
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
                <Component {...pageProps}/>
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
    resources: {
      simpleUnitInfo: await ResourceLoader.getSimpleUnitInfo(),
      afflictions: await ResourceLoader.getEnumAfflictionStatus(),
    },
  };

  appProps.pageProps = pageProps;

  return appProps;
};

export default NextApp;
