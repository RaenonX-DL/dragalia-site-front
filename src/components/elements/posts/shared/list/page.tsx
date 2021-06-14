import React from 'react';

import {useSession} from 'next-auth/client';
import Jumbotron from 'react-bootstrap/Jumbotron';

import {SequencedPostListResponse} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {useNextRouter} from '../../../../../utils/router';
import {FunctionFetchPostList} from '../../../../../utils/services/api';
import {AdsInPostList} from '../../../common/ads/main';
import {FetchStatusSimple, isNotFetched} from '../../../common/fetch';
import {Paginator} from '../../../common/pagination/paginator';
import {PaginationState} from '../../../common/pagination/types';
import {pageToStartIdx, postCountToMaxPage, startIdxToPage} from '../../../common/pagination/utils';
import {PostManageBar, PostManageBarProps} from '../../manageBar';
import {AlertFetchListFailed} from '../alert';


type Status<R extends SequencedPostListResponse> = FetchStatusSimple & {
  paginationState: PaginationState,
  showAlert: boolean,
  errorContent: string
  response?: R,
}

type PostListPageProps<R extends SequencedPostListResponse> = {
  title: string,
  currentUrl: string,
  postManageBarProps: PostManageBarProps,
  fnFetchList: FunctionFetchPostList<R>,
  renderPostEntries: (response: R) => React.ReactElement,
}

export const PostListPage = <R extends SequencedPostListResponse>({
  title,
  currentUrl,
  postManageBarProps,
  fnFetchList,
  renderPostEntries,
}: PostListPageProps<R>) => {
  const {lang} = useI18n();
  const [session] = useSession();
  const router = useNextRouter();

  const currentStart = Math.max(Number(router.query.start) || 0, 0);
  const pageLimit = 10;

  const [status, setStatus] = React.useState<Status<R>>(
    {
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
    },
  );

  const onPageClick = (page: number) => {
    setStatus({
      ...status,
      fetching: true,
    });

    fnFetchList(
      session?.user.id.toString() || '',
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
              maxPage: postCountToMaxPage(data.postCount, pageLimit),
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
            errorContent: data.code.toString(),
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

  // Trigger the fetch request if the start index seems to be in the initializing state
  if (isNotFetched(status)) {
    onPageClick(status.paginationState.currentPage);
  }

  // TEST: Pagination action
  //  - Go to paginated page, use paginator once, then try to go back
  //  - Disable on no item

  // Trigger page click event if the pagination status desync with the URL params
  // - This occurs when the user try to go to the previous page by `history.back()`
  if (!status.fetching && status.paginationState.currentStart !== currentStart) {
    onPageClick(startIdxToPage(currentStart, pageLimit));
  }

  return (
    <>
      <AdsInPostList/>
      <Jumbotron className="mb-3">
        <h4>{title}</h4>
      </Jumbotron>
      {
        session?.user.isAdmin &&
        <div className="mb-3"><PostManageBar {...postManageBarProps}/></div>
      }
      {
        status.showAlert &&
        <AlertFetchListFailed failureMessage={status.errorContent}/>
      }
      {status.response && renderPostEntries(status.response)}
      <div className="d-flex justify-content-center">
        <Paginator
          state={status.paginationState}
          path={currentUrl}
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
