import {getSession} from 'next-auth/client';
import {AppContext} from 'next/app';

import {FailedResponse, PageMetaResponse, SupportedLanguages} from '../../api-def/api';
import {isDataPath, isPostPath, isUnitPath} from '../../const/path/utils';
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

  if (isDataPath(pathnameNoLang)) {
    responsePromise = ApiRequestSender.getDataMeta(
      uid,
      lang,
      'tierKeyPoint',
      context.router.query.id as string,
    );
  }

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
