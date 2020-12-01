const LANG_CODE_CHT = 'cht';

const LANG_CODE_EN = 'en';

const LANG_CODE_JP = 'jp';

const LANG_CODE_TO_CHT = ['zh'];

const LANG_CODE_TO_EN = ['en', 'es'];

const LANG_CODE_TO_JP = ['jp', 'ja'];


export const mapToCustomCode = (orgLang: string | undefined) => {
  if (orgLang === undefined) {
    return undefined;
  }

  const langCode = orgLang.split('-', 1)[0];

  if (LANG_CODE_TO_CHT.some((code) => code === langCode)) {
    return LANG_CODE_CHT;
  }

  if (LANG_CODE_TO_EN.some((code) => code === langCode)) {
    return LANG_CODE_EN;
  }

  if (LANG_CODE_TO_JP.some((code) => code === langCode)) {
    return LANG_CODE_JP;
  }

  return LANG_CODE_CHT;
};
