import React from 'react';

import NextDocument, {Html, Head, Main, NextScript} from 'next/document';


type Props = {}

/**
 * Base react app document component.
 */
class Document extends NextDocument<Props> {
  /**
   * @inheritDoc
   */
  render() {
    // noinspection SpellCheckingInspection,JSUnresolvedLibraryURL,HtmlRequiredTitleElement
    return (
      <Html>
        <Head>
          <meta charSet="utf-8"/>

          <link href="/favicon.ico" rel="icon"/>
          <link href="/logo192.png" rel="shortcut icon" key="shortcutIcon"/>
          <link href="/logo512.png" rel="apple-touch-icon"/>
          <link href="/manifest.json" rel="manifest"/>

          <meta content="#2F4668" name="theme-color"/>

          {/*
          manifest.json provides metadata used when your web app is installed on a
          user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
          */}
          <link href="/manifest.json" rel="manifest"/>

          {/* React-bootstrap imports */}
          <script crossOrigin="anonymous" src="https://unpkg.com/react/umd/react.production.min.js"/>
          <script crossOrigin="anonymous" src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"/>
          <script crossOrigin="anonymous" src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"/>
          <script>const Alert = ReactBootstrap.Alert;</script>

          {/* NOTE: Bootstrap CSS already imported via `bootstrap.css` */}

          {/* Global site tag (gtag.js) - Google Analytics */}
          {
            process.env.NODE_ENV === 'production' &&
            <>
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-796E69CFJG"/>
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
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default Document;
