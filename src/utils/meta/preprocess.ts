import {AppContext} from 'next/app';

import {FailedResponse} from '../../api-def/api/base/response';
import {PageMetaResponse} from '../../api-def/api/meta/general/response';
import {SupportedLanguages} from '../../api-def/api/other/lang';
import {isPostPath} from '../../const/path/definitions';
import {CookiesKeys} from '../cookies/keys';
import {getCookies} from '../cookies/utils';
import {ApiRequestSender} from '../services/api/requestSender';
import {pathPostType} from './lookup';


export const getPageMetaPromise = (
  lang: SupportedLanguages, context: AppContext,
): Promise<PageMetaResponse | FailedResponse> => {
  const {router, ctx} = context;
  const {pathname, query} = router;
  const googleUid = getCookies(CookiesKeys.GOOGLE_UID, ctx.req?.headers.cookie) || '';

  let responsePromise = ApiRequestSender.getPageMeta(googleUid);

  if (isPostPath(pathname)) {
    responsePromise = ApiRequestSender.getPostMeta(googleUid, lang, pathPostType[pathname], Number(query.pid));
  }

  return responsePromise;
};
