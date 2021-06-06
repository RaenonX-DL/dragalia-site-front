import React from 'react';

import {GetServerSideProps} from 'next';
import Error from 'next/error';
import {Alert} from 'react-bootstrap';

import {
  AnalysisResponse,
  CharaAnalysisBody,
  DragonAnalysisBody,
  UnitType,
} from '../../../src/api-def/api';
import {AnalysisFormCharaEdit} from '../../../src/components/elements/posts/analysis/form/charaEdit';
import {AnalysisFormDragonEdit} from '../../../src/components/elements/posts/analysis/form/dragonEdit';
import {GeneralPath} from '../../../src/const/path/definitions';
import {useI18n} from '../../../src/i18n/hook';
import {CookiesKeys} from '../../../src/utils/cookies/keys';
import {getCookies} from '../../../src/utils/cookies/utils';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {getServerSidePropsPost} from '../../../src/utils/ssr';


type AnalysisEditProps = {
  response?: AnalysisResponse,
}

export const getServerSideProps: GetServerSideProps<AnalysisEditProps> = async (context) => {
  const googleUid = getCookies(CookiesKeys.GOOGLE_UID, context.req.cookies);
  if (!googleUid) {
    // FIXME: [Blocked by Auth Rework] Change redirection destination - user not logged in yet
    return {
      redirect: {
        permanent: false,
        destination: GeneralPath.HOME,
      },
    };
  }

  return {
    props: {
      response: await getServerSidePropsPost(context, ApiRequestSender.analysisGet, googleUid),
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

  if (!response) {
    return <Error statusCode={404}/>;
  }

  const analysisType = response.type;

  // Explicit expansion to ensure no other properties like `viewCount` from `response` is included.
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