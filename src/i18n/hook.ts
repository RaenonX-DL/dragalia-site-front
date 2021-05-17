import {SupportedLanguages} from '../api-def/api/other/lang';
import {configDispatchers} from '../state/config/dispatchers';
import {useConfigSelector} from '../state/config/selector';
import {useDispatch} from '../state/store';
import {translations} from './translations/main';
import {TFunction} from './types';
import {getTFunction} from './utils';

type UseI18nReturn = {
  t: TFunction,
  lang: SupportedLanguages,
  setLang: (newLang: SupportedLanguages) => void,
};

export const useI18n = (): UseI18nReturn => {
  const dispatch = useDispatch();
  const {lang} = useConfigSelector();

  const setLang = (newLang: SupportedLanguages) => {
    dispatch(configDispatchers.setConfig({lang: newLang}));
  };

  return {
    t: getTFunction(translations[lang]),
    lang,
    setLang,
  };
};
