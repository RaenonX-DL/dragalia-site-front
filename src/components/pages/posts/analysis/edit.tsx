import React from 'react';

import {useParams} from 'react-router-dom';

import {CharaAnalysisContent, DragonAnalysisContent, UnitType} from '../../../../api-def/api';
import {AnalysisEditParams} from '../../../../const/path';
import {useI18n} from '../../../../i18n/hook';
import {GetTranslationFunction} from '../../../../i18n/types';
import {ApiRequestSender} from '../../../../utils/services/api';
import {useUnitInfo} from '../../../../utils/services/resources/unitInfo';
import {AnalysisFormCharaEdit, AnalysisFormDragonEdit, AnalysisPostFetchStatus, FetchPost} from '../../../elements';
import {PageProps} from '../../props';

const getTitleTranslationName: { [key in UnitType]: GetTranslationFunction } = {
  [UnitType.CHARACTER]: (t) => t.meta.inUse.analysisEditChara.title,
  [UnitType.DRAGON]: (t) => t.meta.inUse.analysisEditDragon.title,
};


export const AnalysisEdit = ({fnSetTitle}: PageProps) => {
  const {t, lang} = useI18n();

  const {pid} = useParams<AnalysisEditParams>();

  const [fetchStatus, setFetchStatus] = React.useState<AnalysisPostFetchStatus>({
    fetched: false,
    fetchFailed: false,
    failureMessage: '',
    post: null,
  });
  const {unitInfoMap} = useUnitInfo();

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
      fnSetTitle(t(
        titleName,
        {title: unitInfoMap.get(fetchStatus.post.unitId)?.name[lang] || fetchStatus.post.unitId.toString()},
      ));
    }

    if (analysisType === UnitType.CHARACTER) {
      return (
        <AnalysisFormCharaEdit
          initialAnalysis={fetchStatus.post as CharaAnalysisContent}
          fnSendRequest={ApiRequestSender.analysisPostEditChara}
        />
      );
    }
    if (analysisType === UnitType.DRAGON) {
      return (
        <AnalysisFormDragonEdit
          initialAnalysis={fetchStatus.post as DragonAnalysisContent}
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
        {analysisType: UnitType[analysisType]},
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
