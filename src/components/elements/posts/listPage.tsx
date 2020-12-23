import React, {ReactElement} from 'react';
import {Alert} from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';
import {PostListEntry, PostListResponse} from '../../../utils/services/api';

import {getGoogleUid, Paginator, PostManageBar, PostManageBarProps} from '../../elements';


const limit = 25;


type QuestListPageProps = {
  fnFetchList: (googleUid: string, langCode: string, start: number, limit: number)
    => Promise<PostListResponse>,
  fnGetPostListJsx: (posts: Array<PostListEntry>) => ReactElement,
  title: string,
  currentUrl: string,
  postManageBarProps: PostManageBarProps,
}


type Status = {
  startIdx: number,
  maxPage: number,
  posts: Array<PostListEntry>,
  isAdmin: boolean,
  showAlert: boolean,
  errorContent: string
}


export const PostListPage = (props: QuestListPageProps) => {
  const {fnFetchList, fnGetPostListJsx, title, currentUrl, postManageBarProps} = props;

  const {t, i18n} = useTranslation();

  const location = useLocation();

  const [status, setStatus] = React.useState<Status>(
    {
      startIdx: -1,
      maxPage: 1,
      posts: [],
      isAdmin: false,
      showAlert: false,
      errorContent: '',
    },
  );

  const queryParamGenerator = (page) => {
    return new URLSearchParams(`start=${(page - 1) * limit}`).toString();
  };

  const getStartIdxFromUrl = () => {
    return parseInt(new URLSearchParams(location.search).get('start') || '0');
  };

  const onPageClick = (page: number) => {
    fetchPostList((page - 1) * limit);
  };

  const fetchPostList = (startIdx?: number) => {
    if (startIdx === undefined || startIdx === null) {
      startIdx = getStartIdxFromUrl();
    }

    fnFetchList(
      getGoogleUid() || '', i18n.language, startIdx, limit)
      .then((data) => {
        // setting state triggers re-render, re-render triggers API call,
        // so having a if statement to guard from the re-render and API re-call

        if (data.success && data.startIdx !== status.startIdx) {
          setStatus({
            ...status,
            startIdx: data.startIdx,
            maxPage: Math.ceil(data.postCount / limit),
            posts: data.posts as Array<PostListEntry>,
            isAdmin: data.isAdmin,
            showAlert: false,
          });
        } else if (!data.success && !status.showAlert) {
          setStatus({
            ...status,
            showAlert: true,
            errorContent: data.code.toString(),
          });
        }
      })
      .catch((error) => {
        // if statement to guard from re-render loop
        if (!status.showAlert) {
          setStatus({
            ...status,
            showAlert: true,
            errorContent: error.toString(),
          });
        }
      });
  };

  const alertFetchFailed = (
    <Alert variant="danger">{t('posts.manage.fetch_list_failed', {error: status.errorContent})}</Alert>
  );

  // Trigger the fetch request if the start index seems to be in the initializing state
  if (status.startIdx === -1) {
    fetchPostList();
  }

  return (
    <>
      <Jumbotron>
        <h4>{title}</h4>
      </Jumbotron>
      {status.isAdmin && <div className="mb-3"><PostManageBar {...postManageBarProps}/></div>}
      {status.showAlert && alertFetchFailed}
      {fnGetPostListJsx(status.posts)}
      <div className="d-flex justify-content-center">
        <Paginator
          path={currentUrl} onPageClick={onPageClick} queryParamGenerator={queryParamGenerator}
          disable={status.showAlert}
          initPage={Math.max(1, Math.floor(getStartIdxFromUrl() / limit + 1))} maxPage={status.maxPage}/>
      </div>
    </>
  );
};
