import React from 'react';

import {SessionProvider, getSession} from 'next-auth/react';
import App, {AppContext, AppInitialProps as NextAppInitialProps, AppProps} from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import {isProduction, isCi} from '../src/api-def/utils';
import {MainApp} from '../src/components/pages/app';
import {PageProps} from '../src/components/pages/type';
import {AppReactContext} from '../src/context/app/main';
import {useI18n} from '../src/i18n/hook';
import {ReduxProvider} from '../src/state/provider';
import {getPageMeta} from '../src/utils/meta/main';
import {ResourceLoader} from '../src/utils/services/resources/loader';

import '../styles/bootstrap.css';
import '../styles/bsIcons.css';
import '../styles/index.css';
import '../styles/scrollbar.scss';
import '../styles/section.css';


const googleAdSenseId = process.env.NEXT_PUBLIC_GA_ID;

// `pageProps` from `AppInitialProps` of `next/app` is `any`, weakening the type check
type AppInitialProps = NextAppInitialProps & {
  pageProps: PageProps
};

const NextApp = ({
  Component,
  pageProps: {session, ...pageProps},
}: AppProps<PageProps>) => {
  const {t} = useI18n();

  // Page meta must be obtained here, or page preview won't work
  return (
    <>
      <Head>
        <title>{pageProps.title}{t((t) => t.meta.suffix)}</title>
        <meta content={pageProps.description} name="description"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      </Head>
      {/* Global site tag (gtag.js) - Google Analytics */}
      {
        isProduction() && !isCi() &&
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAdSenseId}`}
          />
          <Script strategy="lazyOnload" id="gtag">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAdSenseId}');
              `}
          </Script>
        </>
      }
      {/* Google AdSense */}
      {
        !pageProps.session?.user.adsFreeExpiry &&
        <Script strategy="lazyOnload" src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
      }
      {/* New Relic EUM header */}
      {
        isProduction() &&
        <Script strategy="beforeInteractive" type="text/javascript" src="/js/newRelicEum.js"/>
      }
      <React.StrictMode>
        <SessionProvider session={session} refetchInterval={5 * 60}>
          <AppReactContext.Provider value={{session, ...pageProps}}>
            <ReduxProvider>
              <MainApp
                isNotFound={pageProps.isNotFound}
                renderApp={() => <Component {...pageProps}/>}
              />
            </ReduxProvider>
          </AppReactContext.Provider>
        </SessionProvider>
      </React.StrictMode>
    </>
  );
};

NextApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps> => {
  // Call page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext) as AppInitialProps;
  const session = await getSession(appContext.ctx);

  // Taking `pageProps` out to force type checking
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
