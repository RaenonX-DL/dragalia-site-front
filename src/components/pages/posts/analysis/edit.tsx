import React from 'react';

import {useParams} from 'react-router-dom';

import {AnalysisEditParams} from '../../../../const/path';
import {useI18n} from '../../../../i18n/hook';
import {GetTranslationFunction} from '../../../../i18n/types';
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

const getTitleTranslationName: { [key in AnalysisType]: GetTranslationFunction } = {
  [AnalysisType.CHARACTER]: (t) => t.pages.name.analysisEditChara,
  [AnalysisType.DRAGON]: (t) => t.pages.name.analysisEditDragon,
};


export const AnalysisEdit = ({fnSetTitle}: PageProps) => {
  const {t} = useI18n();

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
    setFetchStatus({
      ...fetchStatus,
      fetched: true,
      fetchFailed: true,
      failureMessage: t((t) => t.posts.analysis.error.noPostId),
    });
  } else if (fetchStatus.fetched && !fetchStatus.fetchFailed && fetchStatus.post) {
    const analysisType = fetchStatus.post.type;

    const titleName = getTitleTranslationName[analysisType];

    if (titleName) {
      fnSetTitle(t(titleName, {pid}));
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
      failureMessage: t(
        (t) => t.posts.analysis.error.unknownType,
        {analysisType: AnalysisType[analysisType]},
      ),
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
