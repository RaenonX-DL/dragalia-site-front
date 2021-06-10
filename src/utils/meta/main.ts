import {AppContext} from 'next/app';

import {isPagePath} from '../../const/path/definitions';
import {PageMetaTranslations} from '../../i18n/translations/definition';
import {translations} from '../../i18n/translations/main';
import {GetTranslationFunction} from '../../i18n/types';
import {getMetaTFunction} from '../../i18n/utils';
import {getLangFromQuery, pathnameRemoveLang} from '../path/process';
import {onMetaResponseFailed, onNotFound} from './handler';
import {getPageMetaPromise} from './preprocess';
import {metaTransFunctions} from './translations';
import {PageMeta, isMetaResponseFailure} from './types';


export const getPageMeta = async (context: AppContext): Promise<PageMeta> => {
  const {query, pathname} = context.router;
  const pathnameNoLang = pathnameRemoveLang(pathname);
  const lang = getLangFromQuery(query);

  const metaTFunc = getMetaTFunction(translations[lang]);
  const metaTFuncOnNotFound: GetTranslationFunction<PageMetaTranslations> = (t) => t.meta.error['404'];

  // Early return if `pathname` is not a valid page path - consider as 404
  if (!isPagePath(pathnameNoLang)) {
    return {...onNotFound(context, metaTFunc(metaTFuncOnNotFound)), showAds: true, isAdmin: false};
  }

  const metaResponse = await getPageMetaPromise({lang, pathnameNoLang, context});

  if (isMetaResponseFailure(metaResponse)) {
    return {
      ...onMetaResponseFailed(context, metaResponse, metaTFunc(metaTFuncOnNotFound)),
      showAds: true,
      isAdmin: false,
    };
  }

  return {
    ...metaTFunc(metaTransFunctions[pathnameNoLang], {...metaResponse.params}),
    showAds: metaResponse.showAds,
    isAdmin: metaResponse.isAdmin,
  };
};
