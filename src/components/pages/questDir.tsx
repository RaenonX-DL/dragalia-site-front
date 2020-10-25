import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';

import {getGoogleUid, Paginator, PostList, PostListEntry, PostManageBar} from '../elements';
import Path from '../../constants/path';
import {ApiRequestSender} from '../../constants/api';


const limit = 25;


type Status = {
  startIdx: number,
  posts: Array<PostListEntry>,
  isAdmin: boolean,
  showAlert: boolean,
  errorContent: string
}


export const QuestDir = ({location}: { location: { search: string } }) => {
  const {t} = useTranslation();

  const [status, setStatus] = React.useState<Status>(
    {
      startIdx: -1,
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

    ApiRequestSender.questPostDir(
      getGoogleUid() || '', startIdx, limit)
      .then((data) => {
        // setting state triggers re-render, re-render triggers API call,
        // so having a if statement to guard from the re-render and API re-call

        if (data.success && data.startIdx !== status.startIdx) {
          setStatus(
            (prevState) => {
              // Creating an object because directly modifying `prevState` won't rerender
              const newState = {...prevState};

              newState.startIdx = data.startIdx;
              newState.posts = data.posts;
              newState.isAdmin = data.isAdmin;
              newState.showAlert = false;
              return newState;
            });
        } else if (!data.success && !status.showAlert) {
          setStatus(
            (prevState) => {
              // Creating an object because directly modifying `prevState` won't rerender
              const newState = {...prevState};

              newState.showAlert = true;
              newState.errorContent = data.code.toString();
              return newState;
            });
        }
      })
      .catch((error) => {
        // if statement to guard from re-render loop
        if (!status.showAlert) {
          setStatus(
            (prevState) => {
              // Creating an object because directly modifying `prevState` won't rerender
              const newState = {...prevState};

              newState.showAlert = true;
              newState.errorContent = error.toString();
              return newState;
            });
        }
      });
  };

  const alertFetchFailed = (
    <Alert variant="danger">{t('posts.manage.fetch_failed', {error: status.errorContent})}</Alert>
  );

  // Trigger the fetch request if the start index seems to be in the initializing state
  if (status.startIdx === -1) {
    fetchPostList();
  }

  return (
    <>
      <Jumbotron>
        <h4 className="header">{t('posts.quest.dir')}</h4>
      </Jumbotron>
      {status.isAdmin ? <div className="mb-3"><PostManageBar newPostUrl={Path.QUEST_NEW}/></div> : <></>}
      {status.showAlert ? alertFetchFailed : <></>}
      <PostList posts={status.posts} linkGenerator={(id) => Path.getQuest(id)}/>
      <Paginator
        path={Path.QUEST_DIR} onPageClick={onPageClick} queryParamGenerator={queryParamGenerator}
        initPage={Math.max(1, Math.floor(getStartIdxFromUrl() / 25 + 1))}/>
      {/* DRAFT: search bar at top right side */}
    </>
  );
};
