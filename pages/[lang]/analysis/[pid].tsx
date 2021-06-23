import React from 'react';

import {GetServerSideProps} from 'next';
import {getSession} from 'next-auth/client';
import Alert from 'react-bootstrap/Alert';

import {
  AnalysisGetResponse,
  CharaAnalysisGetResponse,
  DragonAnalysisGetResponse,
  UnitType,
} from '../../../src/api-def/api';
import {AnalysisOutputChara} from '../../../src/components/elements/posts/analysis/output/chara';
import {AnalysisOutputDragon} from '../../../src/components/elements/posts/analysis/output/dragon';
import {useI18n} from '../../../src/i18n/hook';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {getServerSidePropsPost} from '../../../src/utils/ssr';
import Error404 from '../../404';


type AnalysisPageProps = {
  response: AnalysisGetResponse | null,
}

export const getServerSideProps: GetServerSideProps<AnalysisPageProps> = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      response: await getServerSidePropsPost(
        context,
        ApiRequestSender.analysisGet,
        session?.user?.id.toString(),
      ),
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
        // If `response.type` is really unknown, `UnitType[response.type]` might return falsy value
        {analysisType: UnitType[response.type] || response.type},
      )}
    </Alert>
  );
};

export default AnalysisPage;
