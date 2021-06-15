import {AppContext} from 'next/app';

import {ApiResponseCode, FailedResponse} from '../../api-def/api';
import {PageHtmlMeta} from './types';


export const onNotFound = (context: AppContext, notFoundHtmlMeta: PageHtmlMeta): PageHtmlMeta => {
  if (context.ctx.res) {
    context.ctx.res.statusCode = 404;
  }

  return notFoundHtmlMeta;
};

export const onMetaResponseFailed = (
  context: AppContext,
  metaResponse: FailedResponse,
  notFoundHtmlMeta: PageHtmlMeta,
): PageHtmlMeta => {
  // Post not exists
  if (metaResponse.code === ApiResponseCode.FAILED_POST_NOT_EXISTS) {
    return onNotFound(context, notFoundHtmlMeta);
  }

  // Other errors
  const errorMessage = ApiResponseCode[metaResponse.code];

  return {
    title: errorMessage,
    description: errorMessage,
  };
};
