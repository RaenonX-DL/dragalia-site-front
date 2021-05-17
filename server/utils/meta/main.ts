import {ApiResponseCode, FailedResponse, PageMetaResponse, PostPageMetaResponse} from '../../../src/api-def/api';
import {PageMetaTranslations} from '../../../src/i18n/translations/definition';
import {translations} from '../../../src/i18n/translations/main';
import {GetTranslationFunction} from '../../../src/i18n/types';
import {getMetaTFunction} from '../../../src/i18n/utils';
import {transFunctions} from './translations';
import {getLangFromUrl, getMetaDataPromise, getNeutralPathFromUrl, isMetaResponseFailure} from './urlUtils';


type GetMetaTranslationsReturn = PageMetaTranslations & {
  metaResponse: PostPageMetaResponse | PageMetaResponse | FailedResponse,
}

export const getTranslations = async (googleUid: string, url: string): Promise<GetMetaTranslationsReturn> => {
  const onNotFound: GetTranslationFunction<PageMetaTranslations> = (t) => t.meta.error['404'];

  const lang = getLangFromUrl(url);
  const {match, path} = getNeutralPathFromUrl(url);

  const pageMetaResponse = await getMetaDataPromise(googleUid, lang, url, {path, match});

  if (isMetaResponseFailure(pageMetaResponse)) {
    if (pageMetaResponse.code === ApiResponseCode.FAILED_POST_NOT_EXISTS) {
      return {
        ...getMetaTFunction(translations[lang])(onNotFound),
        metaResponse: pageMetaResponse,
      };
    }

    const errorMessage = ApiResponseCode[pageMetaResponse.code];

    return {
      title: errorMessage,
      description: errorMessage,
      metaResponse: pageMetaResponse,
    };
  }

  if (!match || !path) {
    return {
      ...getMetaTFunction(translations[lang])(onNotFound),
      metaResponse: pageMetaResponse,
    };
  }

  return {
    ...getMetaTFunction(translations[lang])(
      transFunctions[path],
      {...match.params, ...pageMetaResponse.params},
    ),
    metaResponse: pageMetaResponse,
  };
};
