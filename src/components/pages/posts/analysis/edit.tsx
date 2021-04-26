import React from 'react';

import {useParams} from 'react-router-dom';

import {AnalysisEditParams} from '../../../../const/path/params';
import {useTranslation} from '../../../../i18n/utils';
import {
  AnalysisType,
  ApiRequestSender,
  CharacterAnalysis,
  DragonAnalysis,
} from '../../../../utils/services/api';
import {
  AnalysisFormCharaEdit,
  AnalysisFormDragonEdit,
  AnalysisPostFetchStatus,
  FetchPost,
} from '../../../elements';
import {PageProps} from '../../props';


export const AnalysisEdit = ({fnSetTitle}: PageProps) => {
  // FIXME: Redirect on no google UID
  const {t} = useTranslation();

  const {pid} = useParams<AnalysisEditParams>();

  const [fetchStatus, setFetchStatus] = React.useState<AnalysisPostFetchStatus>({
    fetched: false,
    fetchFailed: false,
    failureMessage: '',
    post: null,
  });

  if (!pid) {
    // FIXME: Redirect on no post ID found
    setFetchStatus({
      ...fetchStatus,
      fetched: true,
      fetchFailed: true,
      failureMessage: t('posts.analysis.error.no_post_id'),
    });
  } else if (fetchStatus.fetched && !fetchStatus.fetchFailed && fetchStatus.post) {
    const analysisType = fetchStatus.post.type;

    if (analysisType === AnalysisType.CHARACTER) {
      // Character

      const analysis = fetchStatus.post as CharacterAnalysis;
      // FIXME: With post ID
      fnSetTitle(t('pages.name.analysis_edit_chara'));

      return (
        <AnalysisFormCharaEdit
          initialAnalysis={analysis}
          fnSendRequest={ApiRequestSender.analysisPostEditChara}
        />
      );
    }
    if (analysisType === AnalysisType.DRAGON) {
      // Dragon

      const analysis = fetchStatus.post as DragonAnalysis;
      // FIXME: With post ID
      fnSetTitle(t('pages.name.analysis_edit_dragon'));

      return (
        <AnalysisFormDragonEdit
          initialAnalysis={analysis}
          fnSendRequest={ApiRequestSender.analysisPostEditDragon}
        />
      );
    }
    // Unknown post type

    // FIXME: Redirect on unknown type of analysis (w/ global alert)
    setFetchStatus({
      ...fetchStatus,
      fetched: true,
      fetchFailed: true,
      failureMessage: t('posts.analysis.error.unknown_type'),
    });
  }

  return (
    <FetchPost
      status={fetchStatus}
      fnSetStatus={(newStatus) => setFetchStatus(newStatus)}
      fnSendFetchRequest={ApiRequestSender.analysisPostGet}
      seqId={Number(pid)}
      increaseCount={false}
    />
  );
};
