import React, {useEffect} from 'react';

import {useParams} from 'react-router-dom';

import {PostParams} from '../../../../../const/path/params';
import {
  FunctionFetchPost,
  PostGetSuccessResponse,
} from '../../../../../utils/services/api';
import {
  FetchPost,
  PostFetchStatus,
  scrollToAnchor,
} from '../../../../elements';
import {PageProps} from '../../../../pages/props';


type OutputBaseProps<R extends PostGetSuccessResponse, S extends PostFetchStatus<R>> = PageProps & {
  status: S,
  setStatus: (newStatus: S) => void,
  getTitle: (postId: number) => string,
  fnSendFetchRequest: FunctionFetchPost<R>,
  renderOnFetched: (post: R) => React.ReactNode,
}

export const OutputBase = <P extends PostParams, R extends PostGetSuccessResponse, S extends PostFetchStatus<R>>({
  fnSetTitle,
  status,
  setStatus,
  getTitle,
  fnSendFetchRequest,
  renderOnFetched,
}: OutputBaseProps<R, S>): JSX.Element => {
  const pid = Number(useParams<P>().pid);

  useEffect(() => {
    // Only scroll to specified anchor (in URL) if the post fetch succeed
    if (status.fetched && status.post) {
      scrollToAnchor();
    }
  });

  fnSetTitle(getTitle(pid));

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
