import React, {Dispatch, SetStateAction} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {PageProps} from './base';
import {
  AnalysisPostFetchStatus,
  AnalysisPostFormChara,
  AnalysisPostFormDragon,
  FetchPost,
  getGoogleUid,
  PostFetchStatus,
} from '../elements';
import {AnalysisPostType, ApiRequestSender, CharacterAnalysisPost, DragonAnalysisPost} from '../../constants/api';


export const AnalysisEdit = ({fnSetTitle}: PageProps) => {
  const {t, i18n} = useTranslation();

  const {pid} = useParams();

  const [fetchStatus, setFetchStatus] = React.useState<AnalysisPostFetchStatus>({
    fetched: false, fetchFailed: false, failContent: '', post: null,
  });

  const fetchPost = () => ApiRequestSender.analysisPostGet(getGoogleUid() || '', pid, i18n.language, false);

  if (fetchStatus.fetched && !fetchStatus.fetchFailed && fetchStatus.post) {
    const fetchedPost = fetchStatus.post;

    if (fetchedPost.type === AnalysisPostType.CHARACTER) {
      // Character

      fnSetTitle(t('pages.name.analysis_new_chara'));

      return (
        <AnalysisPostFormChara
          post={fetchedPost as CharacterAnalysisPost}
          fnSendRequest={(payload) => ApiRequestSender.analysisPostEditChara(payload)}/>
      );
    } else if (fetchedPost.type === AnalysisPostType.DRAGON) {
      // Dragon

      fnSetTitle(t('pages.name.analysis_new_dragon'));

      return (
        <AnalysisPostFormDragon
          post={fetchedPost as DragonAnalysisPost}
          fnSendRequest={(payload) => ApiRequestSender.analysisPostEditDragon(payload)}/>
      );
    } else {
      // Unknown post type

      setFetchStatus((prevState) => {
        const newState = {...prevState};

        newState.fetched = true;
        newState.fetchFailed = true;
        newState.failContent = t('posts.analysis.error.unknown_type');
        return newState;
      });
    }
  }

  return <FetchPost
    status={fetchStatus}
    fnSetStatus={setFetchStatus as Dispatch<SetStateAction<PostFetchStatus>>}
    fnSendFetchRequest={fetchPost}/>;
};
