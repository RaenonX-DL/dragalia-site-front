import React from 'react';

import {GetServerSideProps} from 'next';
import {Alert} from 'react-bootstrap';
import Cookies from 'universal-cookie';

import {
  UnitType,
  CharaAnalysisBody,
  DragonAnalysisBody,
  AnalysisResponse,
  SupportedLanguages,
} from '../../../src/api-def/api';
import {AnalysisFormCharaEdit} from '../../../src/components/elements/posts/analysis/form/charaEdit';
import {AnalysisFormDragonEdit} from '../../../src/components/elements/posts/analysis/form/dragonEdit';
import {CookiesKeys} from '../../../src/const/cookies';
import {useI18n} from '../../../src/i18n/hook';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';


type AnalysisEditProps = {
  response: AnalysisResponse,
}

export const getServerSideProps: GetServerSideProps<AnalysisEditProps> = async (context) => {
  const {pid, lang} = context.query;

  // FIXME: Centralize cookies obtaining
  const cookies = new Cookies(context.req.cookies);
  const response = await ApiRequestSender.analysisGet(
    cookies.get(CookiesKeys.GOOGLE_UID),
    Number(pid),
    lang as SupportedLanguages,
    false,
  );
  // FIXME: Handle post not found

  return {
    props: {
      response,
    },
  };
};

const AnalysisEdit = ({response}: AnalysisEditProps) => {
  // TEST: Post edit form
  //  - returning character
  //  - returning dragon
  //  - key `viewCount` not included in payload (#124)
  //  - display unknown post type
  const {t} = useI18n();

  const analysisType = response.type;

  // Explicit expansion to ensure no other properties like `viewCount` from `fetchStatus.post` is included.
  // These properties from post get should **NOT** be included in edit payload.
  if (analysisType === UnitType.CHARACTER) {
    const post = response as CharaAnalysisBody;

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
    const post = response as DragonAnalysisBody;

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

  return (
    <Alert variant="danger">
      {t(
        (t) => t.posts.analysis.error.unknownType,
        {analysisType: UnitType[analysisType]},
      )}
    </Alert>
  );
};

export default AnalysisEdit;
