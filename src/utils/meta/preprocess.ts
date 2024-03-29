import {getSession} from 'next-auth/react';
import {AppContext} from 'next/app';

import {FailedResponse, PageMetaResponse, SupportedLanguages} from '../../api-def/api';
import {dataType, isDataPath, isPostPath, isUnitPath, StoryPath} from '../../api-def/paths';
import {ApiRequestSender} from '../services/api/requestSender';
import {pathPostType} from './lookup';


type PageMetaPromiseArgs = {
  lang: SupportedLanguages,
  pathnameNoLang: string,
  context: AppContext,
};

export const getPageMetaPromise = async ({
  lang, pathnameNoLang, context,
}: PageMetaPromiseArgs): Promise<PageMetaResponse | FailedResponse> => {
  const uid = (await getSession(context.ctx))?.user?.id.toString() || '';

  if (isDataPath(pathnameNoLang)) {
    return ApiRequestSender.getDataMeta(
      uid,
      lang,
      dataType[pathnameNoLang],
      context.router.query.id as string,
    );
  }

  if (isPostPath(pathnameNoLang)) {
    return ApiRequestSender.getPostMeta(
      uid,
      lang,
      pathPostType[pathnameNoLang],
      context.router.query.pid as string,
    );
  }

  if (isUnitPath(pathnameNoLang) || pathnameNoLang === StoryPath.UNIT) {
    return ApiRequestSender.getUnitMeta(
      uid,
      lang,
      context.router.query.id as string,
    );
  }

  return ApiRequestSender.getPageMeta(uid, lang);
};
