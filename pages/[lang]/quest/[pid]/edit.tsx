import React from 'react';

import {GetServerSideProps} from 'next';
import {getSession} from 'next-auth/client';

import {QuestPostGetResponse} from '../../../../src/api-def/api';
import {QuestEditForm} from '../../../../src/components/pages/posts/quest/form/edit';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';
import {getServerSidePropsPost} from '../../../../src/utils/ssr';
import Error404 from '../../../404';


type QuestEditProps = {
  response: QuestPostGetResponse | null,
}

export const getServerSideProps: GetServerSideProps<QuestEditProps> = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      response: await getServerSidePropsPost(
        context,
        ApiRequestSender.questGet,
        (pid) => Number(pid),
        session?.user?.id.toString(),
      ),
    },
  };
};

const QuestEdit = ({response}: QuestEditProps) => {
  if (!response) {
    return <Error404/>;
  }

  return <QuestEditForm post={response}/>;
};

export default QuestEdit;

