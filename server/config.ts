import {NextConfig} from 'next/dist/next-server/server/config';

import {SupportedLanguages} from '../src/api-def/api';
import {DEFAULT_LANG} from '../src/i18n/langCode';

const catchAllLocale = 'catchAll';

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
};
