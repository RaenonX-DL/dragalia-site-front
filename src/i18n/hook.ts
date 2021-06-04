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
  const cookies = new Cookies();
  let configLang: SupportedLanguages = cookies.get(CookiesKeys.LANG);
  const {query} = useRouter();
  const routerLang = query.lang;

  if (!configLang || !(configLang in SupportedLanguages)) {
    configLang = DEFAULT_LANG;
  }
  if (configLang !== routerLang) {
    // FIXME: Set language to cookies
    cookies.set(CookiesKeys.LANG, configLang);
  }

  return {
    t: getTFunction(translations[configLang]),
    lang: configLang,
  };
};
