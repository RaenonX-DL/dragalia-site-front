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

// FIXME: Edit analysis ID check false negative (should always be positive - check passed)

const titleTranslationName: { [key in AnalysisType]: string } = {
  [AnalysisType.CHARACTER]: 'pages.name.analysis_edit_chara',
  [AnalysisType.DRAGON]: 'pages.name.analysis_edit_dragon',
};


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

  // TEST: Post edit form
  //  - returning character
  //  - returning dragon
  //  - display unknown post type

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

    const titleName = titleTranslationName[analysisType];

    if (titleName) {
      // FIXME: With Post ID
      fnSetTitle(t(titleName));
    }

    if (analysisType === AnalysisType.CHARACTER) {
      return (
        <AnalysisFormCharaEdit
          initialAnalysis={fetchStatus.post as CharacterAnalysis}
          fnSendRequest={ApiRequestSender.analysisPostEditChara}
        />
      );
    }
    if (analysisType === AnalysisType.DRAGON) {
      return (
        <AnalysisFormDragonEdit
          initialAnalysis={fetchStatus.post as DragonAnalysis}
          fnSendRequest={ApiRequestSender.analysisPostEditDragon}
        />
      );
    }
    // Unknown post type
    setFetchStatus({
      ...fetchStatus,
      fetched: true,
      fetchFailed: true,
      failureMessage: t('posts.analysis.error.unknown_type', {analysisType: AnalysisType[analysisType]}),
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
