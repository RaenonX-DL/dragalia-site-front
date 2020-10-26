import React from 'react';
import {useTranslation} from 'react-i18next';
import {Redirect, useParams} from 'react-router-dom';

import {PageProps} from './base';

import {FetchPost, QuestPostFetchStatus, QuestPostForm} from '../elements';
import {ApiRequestSender} from '../../constants/api';
import Path from '../../constants/path';

export const QuestEdit = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  const {pid} = useParams();

  const [status, setStatus] = React.useState<QuestPostFetchStatus>({
    fetched: false, fetchFailed: false, failContent: '', post: null,
  });

  if (status.post) {
    fnSetTitle(`#${status.post.seqId} - ${t('pages.name.quest_edit')}`);
  } else {
    fnSetTitle(t('pages.name.quest_edit'));
  }

  const handleSubmit = (payload) => ApiRequestSender.questPostEdit(payload);

  return (
    <>
      {
        status.fetched ?
          status.post ?
            <QuestPostForm handleSubmit={handleSubmit} post={status.post}/> :
            <Redirect to={Path.QUEST_NEW}/> :
          <FetchPost status={status} fnSetStatus={setStatus} pid={pid} increaseCount={false}/>
      }
    </>
  );
};
