import React from 'react';

import {GetServerSideProps} from 'next';

import {QuestPostGetResponse} from '../../../src/api-def/api';
import {QuestPostOutput} from '../../../src/components/elements/posts/quest/output/main';
import {CookiesKeys} from '../../../src/utils/cookies/keys';
import {getCookies} from '../../../src/utils/cookies/utils';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {getServerSidePropsPost} from '../../../src/utils/ssr';
import Error404 from '../../404';


type QuestPageProps = {
  response: QuestPostGetResponse | null,
}

export const getServerSideProps: GetServerSideProps<QuestPageProps> = async (context) => {
  const googleUid = getCookies(CookiesKeys.GOOGLE_UID, context.req.cookies);

  return {
    props: {
      response: await getServerSidePropsPost(context, ApiRequestSender.questGet, googleUid || ''),
    },
  };
};

const QuestPage = ({response}: QuestPageProps) => {
  if (!response) {
    return <Error404/>;
  }

  return <QuestPostOutput post={response}/>;
};

export default QuestPage;
