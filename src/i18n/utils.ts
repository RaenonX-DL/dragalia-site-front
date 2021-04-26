import {i18n} from 'i18next';
import {useTranslation as useTranslationOfi18n, Namespace, TFunction} from 'react-i18next';

import {SupportedLanguages} from '../api-def/api/other/lang';

type UseTranslationReturn<N extends Namespace> = {
  t: TFunction<N>,
  i18n: i18n,
  lang: SupportedLanguages,
};

export const useTranslation = <N extends Namespace>(): UseTranslationReturn<N> => {
  const {t, i18n} = useTranslationOfi18n<N>();

  return {t, i18n, lang: i18n.language as SupportedLanguages};
};
