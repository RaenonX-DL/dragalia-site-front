import {NextRouter} from 'next/router';

import {SupportedLanguages} from '../../src/api-def/api';


export const makeRouter = (routerProps?: Partial<NextRouter>): NextRouter => {
  return {
    basePath: '/',
    pathname: '/',
    route: '/',
    query: {lang: SupportedLanguages.EN},
    asPath: '/',
    push: jest.fn().mockResolvedValue(true),
    replace: jest.fn().mockResolvedValue(true),
    reload: jest.fn().mockResolvedValue(true),
    prefetch: () => Promise.resolve(undefined),
    back: jest.fn().mockResolvedValue(true),
    beforePopState: jest.fn().mockResolvedValue(true),
    locale: undefined,
    locales: undefined,
    defaultLocale: undefined,
    domainLocales: undefined,
    isFallback: false,
    isLocaleDomain: false,
    isPreview: false,
    isReady: false,
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    ...routerProps,
  };
};
