import {GetServerSidePropsContext} from 'next';

import {PostGetResponse} from '../api-def/api';
import {getLangFromQuery} from './path/process';
import {FunctionFetchPost} from './services/api/types';


export const getServerSidePropsPost = async <K, R extends PostGetResponse>(
  context: GetServerSidePropsContext,
  fnGetPost: FunctionFetchPost<K, R>,
  fnGetPostId: (pid: string) => K,
  uid?: string,
): Promise<R | null> => {
  const {pid} = context.query;

  try {
    return await fnGetPost({
      uid: uid || '',
      postId: fnGetPostId(pid as string),
      lang: getLangFromQuery(context.query),
      incCount: false,
    });
  } catch {
    return null;
  }
};
