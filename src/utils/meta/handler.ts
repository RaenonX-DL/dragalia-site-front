import {AppContext} from 'next/app';

import {ApiResponseCode, FailedResponse, PageMetaResponse, PostPageMetaResponse} from '../../api-def/api';
import {GetPageMetaReturn} from './types';


export const onNotFound = (context: AppContext, notFoundReturn: GetPageMetaReturn): GetPageMetaReturn => {
  if (context.ctx.res) {
    context.ctx.res.statusCode = 404;
  }

  return notFoundReturn;
};

export const onMetaResponseFailed = (
  context: AppContext,
  metaResponse: PostPageMetaResponse | PageMetaResponse | FailedResponse,
  notFoundReturn: GetPageMetaReturn,
): GetPageMetaReturn => {
  // Post not exists
  if (metaResponse.code === ApiResponseCode.FAILED_POST_NOT_EXISTS) {
    return onNotFound(context, notFoundReturn);
  }

  // Other errors
  const errorMessage = ApiResponseCode[metaResponse.code];

  return {
    title: errorMessage,
    description: errorMessage,
  };
};
