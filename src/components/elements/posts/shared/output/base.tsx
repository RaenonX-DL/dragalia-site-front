import React from 'react';

import {useRouter} from 'next/router';

import {PostGetResponse} from '../../../../../api-def/api';
import {FunctionFetchPost} from '../../../../../utils/services/api';
import {scrollToAnchor} from '../../../common/anchor/utils';
import {FetchPost, PostFetchStatus} from '../../fetch';


type OutputBaseProps<R extends PostGetResponse, S extends PostFetchStatus<R>> = {
  status: S,
  setStatus: (newStatus: S) => void,
  fnSendFetchRequest: FunctionFetchPost<R>,
  renderOnFetched: (post: R) => React.ReactElement,
}

export const OutputBase = <R extends PostGetResponse, S extends PostFetchStatus<R>>({
  status,
  setStatus,
  fnSendFetchRequest,
  renderOnFetched,
}: OutputBaseProps<R, S>): JSX.Element => {
  const {query, push} = useRouter();
  const pid = Number(query.pid);

  // On `status.fetched` changed, attempt scroll to the anchor
  React.useEffect(() => {
    if (status.fetched && status.post) {
      scrollToAnchor(push);
    }
  }, [status.fetched]);

  return (
    <>
      {status.fetched && !status.fetchFailed && status.post && renderOnFetched(status.post)}
      <FetchPost
        status={status}
        fnSetStatus={setStatus}
        fnSendFetchRequest={fnSendFetchRequest}
        seqId={Number(pid)}
        increaseCount
      />
    </>
  );
};
