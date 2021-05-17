import {SupportedLanguages} from '../api-def/api/other/lang';

export const DEFAULT_LANG = SupportedLanguages.CHT;

const langMap: { [lang in string]: SupportedLanguages } = {
  [SupportedLanguages.CHT]: SupportedLanguages.CHT,
  [SupportedLanguages.EN]: SupportedLanguages.EN,
  [SupportedLanguages.JP]: SupportedLanguages.JP,
  zh: SupportedLanguages.CHT,
  es: SupportedLanguages.EN,
  ja: SupportedLanguages.JP,
};


export const mapToSupportedLang = (orgLang?: string | null): SupportedLanguages => {
  if (!orgLang) {
    return DEFAULT_LANG;
  }

  const langCode = orgLang.split('-', 1)[0];

  return langMap[langCode] || DEFAULT_LANG;
};
