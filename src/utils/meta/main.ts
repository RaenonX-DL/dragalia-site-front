import {AppContext} from 'next/app';

import {isSupportedLang} from '../../api-def/api';
import {isPagePath} from '../../const/path/definitions';
import {DEFAULT_LANG} from '../../i18n/langCode';
import {PageMetaTranslations} from '../../i18n/translations/definition';
import {translations} from '../../i18n/translations/main';
import {GetTranslationFunction} from '../../i18n/types';
import {getMetaTFunction} from '../../i18n/utils';
import {onMetaResponseFailed, onNotFound} from './handler';
import {getPageMetaPromise} from './preprocess';
import {metaTransFunctions} from './translations';
import {PageMeta, isMetaResponseFailure} from './types';


export const getPageMeta = async (context: AppContext): Promise<PageMeta> => {
  const {locale, pathname} = context.router;
  const lang = !locale || !isSupportedLang(locale) ? DEFAULT_LANG : locale;

  const metaTFunc = getMetaTFunction(translations[lang]);
  const metaTFuncOnNotFound: GetTranslationFunction<PageMetaTranslations> = (t) => t.meta.error['404'];

  // Early return if `pathname` is not a valid page path - consider as 404
  if (!isPagePath(pathname)) {
    return {...onNotFound(context, metaTFunc(metaTFuncOnNotFound)), showAds: true};
  }

  const metaResponse = await getPageMetaPromise(lang, context);

  if (isMetaResponseFailure(metaResponse)) {
    return {...onMetaResponseFailed(context, metaResponse, metaTFunc(metaTFuncOnNotFound)), showAds: true};
  }

  return {
    ...metaTFunc(metaTransFunctions[pathname], {...metaResponse.params}),
    showAds: metaResponse.showAds,
  };
};
