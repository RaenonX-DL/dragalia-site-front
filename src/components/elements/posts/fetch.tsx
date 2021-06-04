import React from 'react';

import {PostGetResponse, ApiResponseCode} from '../../../api-def/api';
import {useI18n} from '../../../i18n/hook';
import {CookiesControl} from '../../../utils/cookies';
import {FunctionFetchPost} from '../../../utils/services/api';
import {AlertFetchFailed} from './shared/alert';

export type PostFetchStatus<R extends PostGetResponse = PostGetResponse> = {
  fetched: boolean,
  fetchFailed: boolean,
  failureMessage: string,
  post: R | null,
}

type FetchPostProps<R extends PostGetResponse, S extends PostFetchStatus> = {
  status: S,
  fnSetStatus: (newStatus: S) => void,
  fnSendFetchRequest: FunctionFetchPost<R>,
  seqId: number,
  increaseCount?: boolean,
}

// FIXME: Get post should fetch using `getServerProps`
export const FetchPost = <R extends PostGetResponse, S extends PostFetchStatus<R>>({
  status,
  fnSetStatus,
  fnSendFetchRequest,
  seqId,
  increaseCount,
}: FetchPostProps<R, S>) => {
  const {t, lang} = useI18n();

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
                t((t) => t.posts.manage.postNotExists) :
                data.code.toString()
            ),
          });
        }
      })
      .catch((error) => {
        fnSetStatus({
          ...status,
          fetched: true,
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
