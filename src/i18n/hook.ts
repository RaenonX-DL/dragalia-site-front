import {DEFAULT_LANG, SupportedLanguages} from '../api-def/api';
import {getLangFromQuery} from '../api-def/paths';
import {CookiesKeys} from '../utils/cookies/keys';
import {getCookies, setCookies} from '../utils/cookies/utils';
import {useNextRouter} from '../utils/router';
import {translations} from './translations/main';
import {TFunction} from './types';
import {getTFunction} from './utils';


type UseI18nReturn = {
  t: TFunction,
  lang: SupportedLanguages,
};

export const useCookiesLang = (): SupportedLanguages | null => {
  return getCookies<SupportedLanguages>(CookiesKeys.LANG);
};

export const useRouterLang = (): SupportedLanguages => {
  const {query} = useNextRouter();
  return getLangFromQuery(query);
};

export const useI18n = (): UseI18nReturn => {
  const cookiesLang = useCookiesLang();
  const routerLang = useRouterLang();
  let actualLang;

  // Choose the actual lang to use
  if (!cookiesLang) {
    actualLang = routerLang || DEFAULT_LANG;
    // Set language cookies if was not set
    setCookies(CookiesKeys.LANG, actualLang);
  } else {
    actualLang = cookiesLang;

    if (cookiesLang !== routerLang) {
      setCookies(CookiesKeys.LANG, routerLang);
      actualLang = routerLang;
    }
  }

  return {
    t: getTFunction(translations[actualLang]),
    lang: actualLang,
  };
};
