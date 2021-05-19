import {
  ApiResponseCode,
  FailedResponse,
  PageMetaResponse,
  PostPageMetaResponse,
  SupportedLanguages,
} from '../../../src/api-def/api';
import {DEFAULT_LANG} from '../../../src/i18n/langCode';
import {PageMetaTranslations} from '../../../src/i18n/translations/definition';
import {translations} from '../../../src/i18n/translations/main';
import {GetTranslationFunction} from '../../../src/i18n/types';
import {getMetaTFunction} from '../../../src/i18n/utils';
import {patchLanguageToPath} from '../../../src/utils/path/make';
import {
  getLangFromUrl,
  getMetaDataPromise,
  getNeutralPathFromUrl,
  isMetaResponseFailure,
} from '../../../src/utils/path/utils';
import {transFunctions} from './translations';


type GetMetaTranslationsReturn = PageMetaTranslations & {
  metaResponse: PostPageMetaResponse | PageMetaResponse | FailedResponse,
}

export const onMetaResponseFailed = async (
  lang: SupportedLanguages,
  metaResponse: PostPageMetaResponse | PageMetaResponse | FailedResponse,
  onNotFound: GetTranslationFunction<PageMetaTranslations>,
) => {
  // Post not exists
  if (metaResponse.code === ApiResponseCode.FAILED_POST_NOT_EXISTS) {
    return {
      ...getMetaTFunction(translations[lang])(onNotFound),
      metaResponse: metaResponse,
    };
  }

  // Other errors
  const errorMessage = ApiResponseCode[metaResponse.code];

  return {
    title: errorMessage,
    description: errorMessage,
    metaResponse: metaResponse,
  };
};

export const getTranslations = async (googleUid: string, url: string): Promise<GetMetaTranslationsReturn> => {
  const onNotFound: GetTranslationFunction<PageMetaTranslations> = (t) => t.meta.error['404'];

  // Patch the language to URL as needed
  // - `url` will not change if it already contains the language
  url = patchLanguageToPath(url, DEFAULT_LANG);

  const lang = getLangFromUrl(url);
  const {match, path} = getNeutralPathFromUrl(url);

  const metaResponse = await getMetaDataPromise(googleUid, lang, url, {path, match});

  // Failure API meta response
  if (isMetaResponseFailure(metaResponse)) {
    return await onMetaResponseFailed(lang, metaResponse, onNotFound);
  }

  // URL no match
  if (!match || !path) {
    return {
      ...getMetaTFunction(translations[lang])(onNotFound),
      metaResponse: metaResponse,
    };
  }

  return {
    ...getMetaTFunction(translations[lang])(
      transFunctions[path],
      {...match.params, ...metaResponse.params},
    ),
    metaResponse: metaResponse,
  };
};
