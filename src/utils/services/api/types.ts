import {SupportedLanguages, PostGetResponse, SequencedPostListResponse} from '../../../api-def/api';


export type FunctionFetchPostList<R extends SequencedPostListResponse> = (
  uid: string,
  langCode: SupportedLanguages,
  start: number,
  limit: number,
) => Promise<R>

export type FunctionFetchPost<R extends PostGetResponse> = (
  uid: string,
  seqId: number,
  langCode: SupportedLanguages,
  increaseCount?: boolean,
) => Promise<R>
