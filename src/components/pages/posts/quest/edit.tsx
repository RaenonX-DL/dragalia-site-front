import React from 'react';

import {useParams} from 'react-router-dom';

import {QuestEditParams} from '../../../../const/path/params';
import {useTranslation} from '../../../../i18n/utils';
import {ApiRequestSender} from '../../../../utils/services/api';
import {FetchPost, QuestPostFetchStatus} from '../../../elements';
import {QuestEditForm} from '../../../elements/posts/quest/form/edit';
import {PageProps} from '../../props';

export const QuestEdit = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  const {pid} = useParams<QuestEditParams>();

  const [fetchStatus, setFetchStatus] = React.useState<QuestPostFetchStatus>({
    fetched: false,
    fetchFailed: false,
    failureMessage: '',
    post: null,
  });

  if (!pid) {
    setFetchStatus({
      ...fetchStatus,
      fetched: true,
      fetchFailed: true,
      failureMessage: t('posts.analysis.error.no_post_id'),
    });
  } else if (fetchStatus.fetched && !fetchStatus.fetchFailed && fetchStatus.post) {
    fnSetTitle(t('pages.name.quest_edit', {pid: fetchStatus.post.seqId}));

    return <QuestEditForm post={fetchStatus.post}/>;
  }

  return (
    <FetchPost
      status={fetchStatus}
      fnSetStatus={(newStatus) => setFetchStatus(newStatus)}
      fnSendFetchRequest={ApiRequestSender.questPostGet}
      seqId={Number(pid)}
      increaseCount={false}
    />
  );
};
