import {NextConfig} from 'next/dist/next-server/server/config';

import {SupportedLanguages} from '../src/api-def/api';
import {DEFAULT_LANG} from '../src/i18n/langCode';

const catchAllLocale = 'catchAll';

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
  },
  // FIXME: Can't view analysis
  // FIXME: Redirect according to cookies
  // redirects: async () => {
  //   return [
  //     // if the source, query, and cookie are matched,
  //     // this redirect will be applied
  //     {
  //       source: '/specific/:path*',
  //       has: [
  //         {
  //           type: 'cookie',
  //           key: 'authorized',
  //           value: '(?<authorized>yes|true)',
  //         },
  //       ],
  //       permanent: false,
  //       destination: '/home?authorized=:authorized',
  //     },
  //     // if the header `x-authorized` is present and
  //     // contains a matching value, this redirect will be applied
  //     {
  //       source: '/',
  //       has: [
  //         {
  //           type: 'header',
  //           key: 'x-authorized',
  //           value: '(?<authorized>yes|true)',
  //         },
  //       ],
  //       permanent: false,
  //       destination: '/home?authorized=:authorized',
  //     },
  //   ];
  // },
};
