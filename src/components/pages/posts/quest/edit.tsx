import React from 'react';

import {useParams} from 'react-router-dom';

import {QuestEditParams} from '../../../../const/path';
import {useI18n} from '../../../../i18n/hook';
import {ApiRequestSender} from '../../../../utils/services/api';
import {FetchPost, QuestPostFetchStatus} from '../../../elements';
import {QuestEditForm} from '../../../elements/posts/quest/form/edit';
import {PageProps} from '../../props';

export const QuestEdit = ({fnSetTitle}: PageProps) => {
  const {t} = useI18n();

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
      failureMessage: t((t) => t.posts.analysis.error.noPostId),
    });
  } else if (fetchStatus.fetched && !fetchStatus.fetchFailed && fetchStatus.post) {
    fnSetTitle(t(
      (t) => t.meta.inUse.questEdit.title,
      {title: fetchStatus.post.title},
    ));

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
