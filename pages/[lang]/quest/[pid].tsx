import React from 'react';

import {GetServerSideProps} from 'next';
import {getSession} from 'next-auth/client';

import {QuestPostGetResponse} from '../../../src/api-def/api';
import {QuestPostOutput} from '../../../src/components/elements/posts/quest/output/main';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {getServerSidePropsPost} from '../../../src/utils/ssr';
import Error404 from '../../404';


type QuestPageProps = {
  response: QuestPostGetResponse | null,
}

export const getServerSideProps: GetServerSideProps<QuestPageProps> = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      response: await getServerSidePropsPost(context, ApiRequestSender.questGet, session?.user?.id.toString() || ''),
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
