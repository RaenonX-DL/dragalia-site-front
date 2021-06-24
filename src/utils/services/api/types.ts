import {SupportedLanguages, PostGetResponse, SequencedPostListResponse} from '../../../api-def/api';


export type FunctionFetchPostList<R extends SequencedPostListResponse> = (
  uid: string,
  langCode: SupportedLanguages,
  start: number,
  limit: number,
) => Promise<R>

export type FetchPostOptions<K> = {
  uid: string,
  postId: K,
  lang: SupportedLanguages,
  incCount?: boolean,
}

export type FunctionFetchPost<K, R extends PostGetResponse> = (options: FetchPostOptions<K>) => Promise<R>
