import React from 'react';

import {GetServerSideProps} from 'next';

import {QuestPostGetResponse} from '../../../src/api-def/api';
import {QuestEditForm} from '../../../src/components/elements/posts/quest/form/edit';
import {GeneralPath} from '../../../src/const/path/definitions';
import {CookiesKeys} from '../../../src/utils/cookies/keys';
import {getCookies} from '../../../src/utils/cookies/utils';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {getServerSidePropsPost} from '../../../src/utils/ssr';
import Error404 from '../../404';


type QuestEditProps = {
  response: QuestPostGetResponse | null,
}

export const getServerSideProps: GetServerSideProps<QuestEditProps> = async (context) => {
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
      response: await getServerSidePropsPost(context, ApiRequestSender.questGet, googleUid),
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

