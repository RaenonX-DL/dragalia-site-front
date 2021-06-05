import {Redirect, RouteHas} from 'next/dist/lib/load-custom-routes';
import {NextConfig} from 'next/dist/next-server/server/config';

import {SupportedLanguages} from '../src/api-def/api';
import {DEFAULT_LANG} from '../src/i18n/langCode';
import {CookiesKeys} from '../src/utils/cookies/keys';


// FIXME: GA page view - enable auto-collect?

const catchAllLocale = 'catchAll';

const cookieHasLang: RouteHas = {
  type: 'cookie',
  key: CookiesKeys.LANG,
  value: `(?<lang>${Object.values(SupportedLanguages).join('|')})`,
};

const redirectsByCookies: Array<Redirect> = [
  {
    source: `/${catchAllLocale}`,
    destination: '/:lang',
    has: [cookieHasLang],
    locale: false,
    permanent: true,
  },
  {
    source: `/${catchAllLocale}/:slug*`,
    destination: `/:lang/:slug*`,
    has: [cookieHasLang],
    locale: false,
    permanent: true,
  },
];

const redirectsToDefault: Array<Redirect> = [
  {
    source: `/${catchAllLocale}`,
    destination: `/${DEFAULT_LANG}`,
    locale: false,
    permanent: true,
  },
  {
    source: `/${catchAllLocale}/:slug*`,
    destination: `/${DEFAULT_LANG}/:slug*`,
    locale: false,
    permanent: true,
  },
];

// FIXME: Can't view analysis
export const nextConfig: NextConfig = {
  // Required
  future: {},
  experimental: {},
  // Optional
  i18n: {
    locales: [...Object.values(SupportedLanguages), catchAllLocale],
    defaultLocale: catchAllLocale,
  },
  redirects: async () => {
    return [
      ...redirectsByCookies,
      ...redirectsToDefault,
    ];
  },
};
