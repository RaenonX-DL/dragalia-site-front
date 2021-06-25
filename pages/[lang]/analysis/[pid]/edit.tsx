import React from 'react';

import {GetServerSideProps} from 'next';
import {getSession} from 'next-auth/client';
import Alert from 'react-bootstrap/Alert';

import {
  AnalysisResponse,
  CharaAnalysisBody,
  DragonAnalysisBody,
  UnitType,
} from '../../../../src/api-def/api';
import {AnalysisFormCharaEdit} from '../../../../src/components/elements/posts/analysis/form/chara/edit';
import {AnalysisFormDragonEdit} from '../../../../src/components/elements/posts/analysis/form/dragon/edit';
import {useI18n} from '../../../../src/i18n/hook';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';
import {getServerSidePropsPost} from '../../../../src/utils/ssr';
import Error404 from '../../../404';


type AnalysisEditProps = {
  response: AnalysisResponse | null,
}

export const getServerSideProps: GetServerSideProps<AnalysisEditProps> = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      response: await getServerSidePropsPost(
        context,
        ApiRequestSender.analysisGet,
        // No need to type cast here as these will be sent as string in API request
        (pid) => pid,
        session?.user?.id.toString(),
      ),
    },
  };
};

const AnalysisEdit = ({response}: AnalysisEditProps) => {
  const {t} = useI18n();

  if (!response) {
    return <Error404/>;
  }

  const analysisType = response.type;

  // Explicit expansion to ensure no other properties like `viewCount` from `response` is included.
  // These properties from post get should **NOT** be included in edit payload.
  if (analysisType === UnitType.CHARACTER) {
    const post = response as CharaAnalysisBody;

    return (
      <AnalysisFormCharaEdit
        analysis={{
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
      />
    );
  }
  if (analysisType === UnitType.DRAGON) {
    const post = response as DragonAnalysisBody;

    return (
      <AnalysisFormDragonEdit
        analysis={{
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
      />
    );
  }

  return (
    <Alert variant="danger">
      {t(
        (t) => t.posts.analysis.error.unknownType,
        // If `response.type` is really unknown, `UnitType[response.type]` might return falsy value
        {analysisType: UnitType[response.type] || response.type.toString()},
      )}
    </Alert>
  );
}
;

export default AnalysisEdit;
