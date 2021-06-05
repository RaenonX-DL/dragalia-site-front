import {NextConfig} from 'next/dist/next-server/server/config';

import {SupportedLanguages} from '../src/api-def/api';
import {DEFAULT_LANG} from '../src/i18n/langCode';

export const nextConfig: NextConfig = {
  // Required
  future: {},
  experimental: {},
  // Optional
  i18n: {
    locales: Object.values(SupportedLanguages),
    defaultLocale: DEFAULT_LANG,
  },
  pageExtensions: ['page.tsx'],
  // FIXME: Clicking navbar doesn't have default locale prepended
  // FIXME: Redirect non-supported languages - https://nextjs.org/docs/api-reference/next.config.js/redirects
  //  - https://stackoverflow.com/questions/50589686/regex-negative-lookahead-with-named-capture-group
  //  - (?!en|ch) - https://regex101.com/
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
  //           value: 'true',
  //         },
  //       ],
  //       permanent: false,
  //       destination: '/another/:path*',
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
