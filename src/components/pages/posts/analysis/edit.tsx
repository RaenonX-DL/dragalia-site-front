import React from 'react';

import {useParams} from 'react-router-dom';

import {CharaAnalysisBody, DragonAnalysisBody, UnitType} from '../../../../api-def/api';
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
  //  - key `viewCount` not included in payload (#124)
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

    // Explicit expansion to ensure no other properties like `viewCount` from `fetchStatus.post` is included.
    // These properties from post get should **NOT** be included in edit payload.
    if (analysisType === UnitType.CHARACTER) {
      const post = fetchStatus.post as CharaAnalysisBody;

      return (
        <AnalysisFormCharaEdit
          initialAnalysis={{
            lang: post.lang,
            unitId: post.unitId,
            type: post.type,
            summary: post.summary,
            summonResult: post.summonResult,
            passives: post.passives,
            normalAttacks: post.normalAttacks,
            tipsBuilds: post.tipsBuilds,
            forceStrikes: post.forceStrikes,
            skills: post.skills,
            videos: post.videos,
            story: post.story,
            keywords: post.keywords,
          }}
          fnSendRequest={ApiRequestSender.analysisEditChara}
        />
      );
    }
    if (analysisType === UnitType.DRAGON) {
      const post = fetchStatus.post as DragonAnalysisBody;

      return (
        <AnalysisFormDragonEdit
          initialAnalysis={{
            lang: post.lang,
            unitId: post.unitId,
            type: post.type,
            summary: post.summary,
            summonResult: post.summonResult,
            passives: post.passives,
            normalAttacks: post.normalAttacks,
            ultimate: post.ultimate,
            notes: post.notes,
            suitableCharacters: post.suitableCharacters,
            videos: post.videos,
            story: post.story,
            keywords: post.keywords,
          }}
          fnSendRequest={ApiRequestSender.analysisEditDragon}
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
      fnSendFetchRequest={ApiRequestSender.analysisGet}
      seqId={Number(pid)}
      increaseCount={false}
    />
  );
};
