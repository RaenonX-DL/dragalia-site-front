import React from 'react';

import {useTranslation} from '../../../i18n/utils';
import {CookiesControl} from '../../../utils/cookies';
import {
  ApiResponseCode,
  PostGetSuccessResponse,
  FunctionFetchPost,
} from '../../../utils/services/api';
import {AlertFetchFailed} from './shared/alert';

export type PostFetchStatus<R extends PostGetSuccessResponse = PostGetSuccessResponse> = {
  fetched: boolean,
  fetchFailed: boolean,
  failureMessage: string,
  post: R | null,
}

type FetchPostProps<R extends PostGetSuccessResponse, S extends PostFetchStatus> = {
  status: S,
  fnSetStatus: (newStatus: S) => void,
  fnSendFetchRequest: FunctionFetchPost<R>,
  seqId: number,
  increaseCount?: boolean,
}

export const FetchPost = <R extends PostGetSuccessResponse, S extends PostFetchStatus<R>>({
  status,
  fnSetStatus,
  fnSendFetchRequest,
  seqId,
  increaseCount,
}: FetchPostProps<R, S>) => {
  const {t, lang} = useTranslation();

  if (!status.fetched) {
    fnSendFetchRequest(
      CookiesControl.getGoogleUid() || '',
      seqId,
      lang,
      increaseCount,
    )
      .then((data) => {
        if (data.success) {
          fnSetStatus({
            ...status,
            fetched: true,
            fetchFailed: false,
            post: data,
          });
        } else {
          fnSetStatus({
            ...status,
            fetched: true,
            fetchFailed: true,
            failureMessage: (
              data.code === ApiResponseCode.FAILED_POST_NOT_EXISTS ?
                t('posts.manage.post_not_exists') :
                data.code.toString()
            ),
          });
        }
      })
      .catch((error) => {
        fnSetStatus({
          ...status,
          fetchFailed: true,
          failureMessage: error.toString(),
        });
      });
  }

  if (status.fetchFailed) {
    return <AlertFetchFailed failureMessage={status.failureMessage}/>;
  }

  return <></>;
};
