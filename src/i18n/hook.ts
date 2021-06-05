import {useRouter} from 'next/router';
import Cookies from 'universal-cookie';

import {SupportedLanguages} from '../api-def/api';
import {CookiesKeys} from '../const/cookies';
import {DEFAULT_LANG} from './langCode';
import {translations} from './translations/main';
import {TFunction} from './types';
import {getTFunction} from './utils';

type UseI18nReturn = {
  t: TFunction,
  lang: SupportedLanguages,
};

export const useI18n = (): UseI18nReturn => {
  // FIXME: Centralize cookie management & set default lang
  // FIXME: Page not reflecting actual lang
  // TEST: I18n hook
  //  - No cookies no router: use default and set cookies
  //  - No cookies has router: use router and set cookies
  //  - Has cookies has router: no change
  //  - Has cookies no router: no change (auto-redirect)
  const cookies = new Cookies();
  let configLang: SupportedLanguages = cookies.get(CookiesKeys.LANG);
  const isCookieNotSet = !configLang;
  const {locale} = useRouter();
  const routerLang: SupportedLanguages = locale as SupportedLanguages;

  if (!configLang) {
    configLang = routerLang || DEFAULT_LANG;
  }
  if (!(Object.values(SupportedLanguages).some((lang) => lang === configLang))) {
    configLang = DEFAULT_LANG;
  }
  if (isCookieNotSet) {
    // FIXME: Set language to cookies
    cookies.set(CookiesKeys.LANG, configLang);
  }

  return {
    t: getTFunction(translations[configLang]),
    lang: configLang,
  };
};
