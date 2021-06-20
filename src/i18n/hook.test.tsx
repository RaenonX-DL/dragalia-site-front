import * as nextRouter from 'next/router';

import {renderReactHook} from '../../test/render/main';
import {makeRouter} from '../../test/render/router';
import {SupportedLanguages} from '../api-def/api';
import {CookiesKeys} from '../utils/cookies/keys';
import * as cookieUtils from '../utils/cookies/utils';
import {useI18n} from './hook';


describe('I18n hook', () => {
  let useRouter: jest.SpyInstance;
  let setCookies: jest.SpyInstance;
  let getCookies: jest.SpyInstance;

  beforeEach(() => {
    useRouter = jest.spyOn(nextRouter, 'useRouter');
    setCookies = jest.spyOn(cookieUtils, 'setCookies');
    getCookies = jest.spyOn(cookieUtils, 'getCookies');
  });

  // (X) cookies (X) router will be redirected by the framework

  test('(X) cookies (O) router: use router & set cookies', async () => {
    getCookies.mockReturnValueOnce(null);
    useRouter.mockReturnValueOnce(makeRouter({query: {lang: SupportedLanguages.JP}}));

    const {result} = renderReactHook(() => useI18n());

    expect(setCookies).toHaveBeenCalledWith(CookiesKeys.LANG, SupportedLanguages.JP);
    expect(result.current.lang).toBe(SupportedLanguages.JP);
  });

  // (O) cookies (X) router will be redirected by the framework

  test('(O) cookies (O) router: (same) no change', async () => {
    getCookies.mockReturnValueOnce(SupportedLanguages.JP);
    useRouter.mockReturnValueOnce(makeRouter({query: {lang: SupportedLanguages.JP}}));

    const {result} = renderReactHook(() => useI18n());

    expect(result.current.lang).toBe(SupportedLanguages.JP);
    expect(setCookies).not.toHaveBeenCalled();
  });

  test('(O) cookies (O) router: (conflicted) pick router and set', async () => {
    getCookies.mockReturnValueOnce(SupportedLanguages.CHT);
    useRouter.mockReturnValueOnce(makeRouter({query: {lang: SupportedLanguages.JP}}));

    const {result} = renderReactHook(() => useI18n());

    expect(setCookies).toHaveBeenCalledWith(CookiesKeys.LANG, SupportedLanguages.JP);
    expect(result.current.lang).toBe(SupportedLanguages.JP);
  });
});
