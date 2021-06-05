import {GetServerSidePropsContext} from 'next';

import {SupportedLanguages} from '../api-def/api/other/lang';
import {PostGetResponse} from '../api-def/api/post/base/response/common';
import {FunctionFetchPost} from './services/api/types';


export const getServerSidePropsPost = async <T extends PostGetResponse>(
  context: GetServerSidePropsContext,
  fnGetPost: FunctionFetchPost<T>,
  googleUid: string,
): Promise<T | undefined> => {
  const {pid} = context.query;

  try {
    return await fnGetPost(
      googleUid,
      Number(pid),
      context.locale as SupportedLanguages,
      false,
    );
  } catch {
    return undefined;
  }
};
