import {GetServerSidePropsContext} from 'next';

import {PostGetResponse} from '../api-def/api';
import {getLangFromQuery} from './path/process';
import {FunctionFetchPost} from './services/api/types';


export const getServerSidePropsPost = async <T extends PostGetResponse>(
  context: GetServerSidePropsContext,
  fnGetPost: FunctionFetchPost<T>,
  uid?: string,
): Promise<T | null> => {
  const {pid} = context.query;

  try {
    return await fnGetPost(
      uid || '',
      Number(pid),
      getLangFromQuery(context.query),
      false,
    );
  } catch {
    return null;
  }
};
