import React from 'react';

import {GetServerSideProps} from 'next';
import {getSession} from 'next-auth/client';

import {QuestPostGetResponse} from '../../../../src/api-def/api';
import {QuestEditForm} from '../../../../src/components/elements/posts/quest/form/edit';
import {GeneralPath} from '../../../../src/const/path/definitions';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';
import {getServerSidePropsPost} from '../../../../src/utils/ssr';
import Error404 from '../../../404';


type QuestEditProps = {
  response: QuestPostGetResponse | null,
}

export const getServerSideProps: GetServerSideProps<QuestEditProps> = async (context) => {
  const session = await getSession(context);

  if (!session) {
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
      response: await getServerSidePropsPost(context, ApiRequestSender.questGet, session?.user?.id.toString()),
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

