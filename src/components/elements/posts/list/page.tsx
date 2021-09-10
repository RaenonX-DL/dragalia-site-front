import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';

import {ApiResponseCode, SequencedPostListResponse} from '../../../../api-def/api';
import {AppReactContext} from '../../../../context/app/main';
import {useI18n} from '../../../../i18n/hook';
import {useNextRouter} from '../../../../utils/router';
import {FunctionFetchPostList} from '../../../../utils/services/api';
import {AdsPostList} from '../../common/ads/main';
import {FetchStatusSimple, isNotFetched} from '../../common/fetch';
import {Paginator} from '../../common/pagination/paginator';
import {PaginationState} from '../../common/pagination/types';
import {pageToStartIdx, countToMaxPage, startIdxToPage} from '../../common/pagination/utils';
import {AlertFetchListFailed} from '../alert';
import {PostManageBar, PostManageBarProps} from '../manageBar';


type Status<R extends SequencedPostListResponse> = FetchStatusSimple & {
  paginationState: PaginationState,
  showAlert: boolean,
  errorContent: string
  response?: R,
}

type PostListPageProps<R extends SequencedPostListResponse> = {
  title: string,
  postManageBarProps: PostManageBarProps,
  fnFetchList: FunctionFetchPostList<R>,
  renderPostEntries: (response: R) => React.ReactElement,
  pageLimit?: number
}

export const PostListPage = <R extends SequencedPostListResponse>({
  title,
  postManageBarProps,
  fnFetchList,
  renderPostEntries,
  pageLimit = 10,
}: PostListPageProps<R>) => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);
  const router = useNextRouter();

  const currentStart = Math.max(Number(router.query.start) || 0, 0);

  const [status, setStatus] = React.useState<Status<R>>({
    paginationState: {
      currentStart,
      currentPage: startIdxToPage(currentStart, pageLimit),
      maxPage: -1,
      pageLimit,
    },
    fetched: false,
    fetching: false,
    showAlert: false,
    errorContent: '',
  });

  const onPageClick = (page: number) => {
    setStatus({
      ...status,
      fetching: true,
      fetched: false,
    });

    fnFetchList(
      context?.session?.user.id.toString() || '',
      lang,
      pageToStartIdx(page, pageLimit),
      pageLimit,
    )
      .then((data) => {
        if (data.success) {
          setStatus({
            ...status,
            paginationState: {
              ...status.paginationState,
              currentStart: data.startIdx,
              currentPage: startIdxToPage(data.startIdx, pageLimit),
              maxPage: countToMaxPage(data.postCount, pageLimit),
            },
            fetched: true,
            fetching: false,
            showAlert: false,
            response: data,
          });
        } else {
          setStatus({
            ...status,
            fetched: true,
            fetching: false,
            showAlert: true,
            errorContent: ApiResponseCode[data.code],
          });
        }
      })
      .catch((error) => {
        setStatus({
          ...status,
          fetched: true,
          fetching: false,
          showAlert: true,
          errorContent: error.toString(),
        });
      });
  };

  // Trigger fetch request if the status is in the initial state
  if (isNotFetched(status)) {
    onPageClick(status.paginationState.currentPage);
  }

  // Trigger page click event if the pagination status desync with the URL params
  // - This occurs when the user try to go to the previous page by `history.back()`
  if (!status.fetching && status.paginationState.currentStart !== currentStart) {
    onPageClick(startIdxToPage(currentStart, pageLimit));
  }

  return (
    <>
      <AdsPostList/>
      <Jumbotron className="mb-3">
        <h4>{title}</h4>
      </Jumbotron>
      {
        context?.session?.user.isAdmin &&
        <PostManageBar {...postManageBarProps}/>
      }
      {
        status.showAlert &&
        <AlertFetchListFailed failureMessage={status.errorContent}/>
      }
      {status.response && renderPostEntries(status.response)}
      <div className="d-flex justify-content-center">
        <Paginator
          state={status.paginationState}
          onPageClick={onPageClick}
          getNewQueryParam={(page) => (
            new URLSearchParams(`start=${(page - 1) * status.paginationState.pageLimit}`)
              .toString()
          )}
          disable={status.showAlert || !status.response?.posts.length}
        />
      </div>
    </>
  );
};
