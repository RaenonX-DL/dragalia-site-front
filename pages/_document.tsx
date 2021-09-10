import React from 'react';

// FIXME: False-positive https://github.com/vercel/next.js/issues/28786
// eslint-disable-next-line @next/next/no-document-import-in-page
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

          <link href="/logo192.png" rel="icon"/>
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
          {/* No known available async ways to import these yet */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            crossOrigin="anonymous"
            src="https://unpkg.com/react/umd/react.production.min.js"
          />
          {/* No known available async ways to import these yet */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          />
          {/* No known available async ways to import these yet */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          />

          <script>var Alert = ReactBootstrap.Alert;</script>

          {/* NOTE: Bootstrap CSS already imported via `bootstrap.css` */}
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
