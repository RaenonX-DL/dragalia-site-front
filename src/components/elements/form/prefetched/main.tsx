import React from 'react';

import {useSession} from 'next-auth/react';

import {ApiResponseCode, isFailedResponse, PostGetResponse} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {useNextRouter} from '../../../../utils/router';
import {FunctionFetchPost} from '../../../../utils/services/api/types';
import {Error404} from '../../../error/404';
import {ApiError} from '../../../error/api';
import {useFetchState} from '../../common/fetch';
import {Loading} from '../../common/loading';


type Props<K extends string | number, R extends PostGetResponse> = {
  fnFetch: FunctionFetchPost<K, R>,
  renderOnSuccess: (response: R) => React.ReactNode,
};


export const PrefetchedForm = <K extends string | number, R extends PostGetResponse>({
  fnFetch,
  renderOnSuccess,
}: Props<K, R>) => {
  const {lang} = useI18n();
  const {query} = useNextRouter();
  const {data} = useSession();

  const postId = query.pid as K;

  const {
    fetchStatus,
    fetchFunction: fetchPost,
  } = useFetchState<R | undefined>(
    undefined,
    () => fnFetch({uid: data?.user.id.toString() || '', postId, lang, incCount: false}),
    'Failed to fetch the post.',
  );

  fetchPost();

  if (fetchStatus.fetching) {
    return <Loading/>;
  }
  if (!fetchStatus.data) {
    return <>Data unavailable.</>;
  }
  if (isFailedResponse(fetchStatus.data)) {
    const responseCode = fetchStatus.data.code;

    if (responseCode === ApiResponseCode.FAILED_POST_NOT_EXISTS) {
      return <Error404/>;
    } else {
      return <ApiError responseCode={responseCode}/>;
    }
  }

  return <>{renderOnSuccess(fetchStatus.data)}</>;
};
