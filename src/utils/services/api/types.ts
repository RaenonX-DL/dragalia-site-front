import {SupportedLanguages} from '../../../api-def/api/other/lang';
import {PostGetSuccessResponse, PostListResponse} from '../../../api-def/api/post/base/response';

export type FunctionFetchPostList<R extends PostListResponse> = (
  googleUid: string,
  langCode: SupportedLanguages,
  start: number,
  limit: number,
) => Promise<R>

export type FunctionFetchPost<R extends PostGetSuccessResponse> = (
  googleUid: string,
  seqId: number,
  langCode: SupportedLanguages,
  increaseCount?: boolean,
) => Promise<R>
