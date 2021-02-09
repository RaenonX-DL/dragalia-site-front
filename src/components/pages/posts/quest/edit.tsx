import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import {Redirect, useParams} from 'react-router-dom';
import Path from '../../../../constants/path';
import {ApiRequestSender} from '../../../../utils/services/api';

import {FetchPost, getGoogleUid, PostFetchStatus, QuestPostFetchStatus, QuestPostForm} from '../../../elements';

import {PageProps} from '../../base';

export const QuestEdit = ({fnSetTitle}: PageProps) => {
  const {t, i18n} = useTranslation();

  const {pid} = useParams();

  const [status, setStatus] = React.useState<QuestPostFetchStatus>({
    fetched: false, fetchFailed: false, failContent: '', post: null,
  });

  if (status.post) {
    fnSetTitle(`#Q${status.post.seqId} - ${t('pages.name.quest_edit')}`);
  } else {
    fnSetTitle(t('pages.name.quest_edit'));
  }

  const handleSubmit = (payload) => ApiRequestSender.questPostEdit(payload);

  const fnSendFetchRequest = () =>
    ApiRequestSender.questPostGet(getGoogleUid() || '', pid, i18n.language, false);

  return (
    <>
      {
        status.fetched ?
          status.post ?
            <QuestPostForm fnSendRequest={handleSubmit} post={status.post}/> :
            <Redirect to={Path.QUEST_NEW}/> :
          <FetchPost
            status={status} fnSetStatus={setStatus as Dispatch<SetStateAction<PostFetchStatus>>}
            fnSendFetchRequest={fnSendFetchRequest}/>
      }
    </>
  );
};
