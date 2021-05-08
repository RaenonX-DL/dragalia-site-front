import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';

import {getParamValue} from '../../../../../const/path/utils';
import {useTranslation} from '../../../../../i18n/utils';
import {FunctionFetchPostList, PostListResponse} from '../../../../../utils/services/api';
import {getGoogleUid, Paginator, PostManageBar, PostManageBarProps} from '../../../../elements';
import {AdsInPostList} from '../../../common/ads';
import {FetchStatusSimple} from '../../../common/fetch';
import {PaginationState} from '../../../common/pagination/types';
import {pageToStartIdx, startIdxToPage} from '../../../common/pagination/utils';
import {AlertFetchListFailed} from '../alert';


type Status<R extends PostListResponse> = FetchStatusSimple & {
  paginationState: PaginationState,
  isAdmin: boolean,
  showAds: boolean,
  showAlert: boolean,
  errorContent: string
  response?: R,
}

type PostListPageProps<R extends PostListResponse> = {
  title: string,
  currentUrl: string,
  postManageBarProps: PostManageBarProps,
  fnFetchList: FunctionFetchPostList<R>,
  renderPostEntries: (response: R) => React.ReactNode,
}

export const PostListPage = <R extends PostListResponse>({
  title,
  currentUrl,
  postManageBarProps,
  fnFetchList,
  renderPostEntries,
}: PostListPageProps<R>) => {
  const {lang} = useTranslation();

  const currentStart = Math.max(Number(getParamValue('start')) || 0, 0);
  const pageLimit = 25;

  const [status, setStatus] = React.useState<Status<R>>(
    {
      paginationState: {
        currentStart,
        currentPage: startIdxToPage(currentStart, pageLimit),
        maxPage: -1,
        pageLimit: pageLimit,
      },
      fetched: false,
      fetching: false,
      isAdmin: false,
      showAds: false,
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
      getGoogleUid() || '',
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
              maxPage: startIdxToPage(data.postCount, pageLimit),
            },
            fetched: true,
            fetching: false,
            isAdmin: data.isAdmin,
            showAds: data.showAds,
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
  if (!status.fetched && !status.fetching) {
    onPageClick(status.paginationState.currentPage);
  }

  return (
    <>
      {status.showAds && <AdsInPostList/>}
      <Jumbotron className="mb-3">
        <h4>{title}</h4>
      </Jumbotron>
      {
        status.isAdmin &&
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
