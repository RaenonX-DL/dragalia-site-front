import {SupportedLanguages, PostGetResponse, SequencedPostListResponse} from '../../../api-def/api';


export type FunctionFetchPostList<R extends SequencedPostListResponse> = (
  uid: string,
  langCode: SupportedLanguages,
) => Promise<R>;

export type FetchPostOptions<K extends string | number> = {
  uid: string,
  postId: K,
  lang: SupportedLanguages,
  incCount?: boolean,
};

export type FunctionFetchPost<K extends string | number, R extends PostGetResponse> = (
  options: FetchPostOptions<K>
) => Promise<R>;
