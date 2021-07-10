import {getSession} from 'next-auth/client';
import {AppContext} from 'next/app';

import {FailedResponse} from '../../api-def/api/base/response';
import {PageMetaResponse} from '../../api-def/api/meta/general/response';
import {SupportedLanguages} from '../../api-def/api/other/lang';
import {isPostPath, isUnitPath} from '../../const/path/definitions';
import {ApiRequestSender} from '../services/api/requestSender';
import {pathPostType} from './lookup';


type PageMetaPromiseArgs = {
  lang: SupportedLanguages,
  pathnameNoLang: string,
  context: AppContext,
}

export const getPageMetaPromise = async ({
  lang, pathnameNoLang, context,
}: PageMetaPromiseArgs): Promise<PageMetaResponse | FailedResponse> => {
  const uid = (await getSession(context.ctx))?.user?.id.toString() || '';

  let responsePromise = ApiRequestSender.getPageMeta(uid, lang);

  if (isPostPath(pathnameNoLang)) {
    responsePromise = ApiRequestSender.getPostMeta(
      uid,
      lang,
      pathPostType[pathnameNoLang],
      context.router.query.pid as string,
    );
  }

  if (isUnitPath(pathnameNoLang)) {
    responsePromise = ApiRequestSender.getUnitMeta(
      uid,
      lang,
      context.router.query.id as string,
    );
  }

  return responsePromise;
};
