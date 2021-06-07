import React from 'react';

import {GetServerSideProps} from 'next';
import {Alert} from 'react-bootstrap';

import {
  AnalysisGetResponse,
  CharaAnalysisGetResponse,
  DragonAnalysisGetResponse,
  UnitType,
} from '../../src/api-def/api';
import {AnalysisOutputChara} from '../../src/components/elements/posts/analysis/output/chara';
import {AnalysisOutputDragon} from '../../src/components/elements/posts/analysis/output/dragon';
import {useI18n} from '../../src/i18n/hook';
import {CookiesKeys} from '../../src/utils/cookies/keys';
import {getCookies} from '../../src/utils/cookies/utils';
import {ApiRequestSender} from '../../src/utils/services/api/requestSender';
import {getServerSidePropsPost} from '../../src/utils/ssr';
import Error404 from '../404';


type AnalysisPageProps = {
  response: AnalysisGetResponse | null,
}

export const getServerSideProps: GetServerSideProps<AnalysisPageProps> = async (context) => {
  const googleUid = getCookies(CookiesKeys.GOOGLE_UID, context.req.cookies);

  return {
    props: {
      response: await getServerSidePropsPost(context, ApiRequestSender.analysisGet, googleUid || ''),
    },
  };
};

const AnalysisPage = ({response}: AnalysisPageProps) => {
  const {t} = useI18n();

  if (!response) {
    return <Error404/>;
  }

  if (response.type === UnitType.CHARACTER) {
    return (
      <AnalysisOutputChara analysis={response as CharaAnalysisGetResponse}/>
    );
  }
  if (response.type === UnitType.DRAGON) {
    return (
      <AnalysisOutputDragon analysis={response as DragonAnalysisGetResponse}/>
    );
  }

  return (
    <Alert variant="danger">
      {t(
        (t) => t.posts.analysis.error.unknownType,
        {analysisType: UnitType[response.type]},
      )}
    </Alert>
  );
};

export default AnalysisPage;
