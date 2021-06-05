import React from 'react';

import {GetServerSideProps} from 'next';


import {QuestPostGetResponse, SupportedLanguages} from '../../../src/api-def/api';
import {QuestEditForm} from '../../../src/components/elements/posts/quest/form/edit';
import {GeneralPath} from '../../../src/const/path/definitions';
import {CookiesKeys} from '../../../src/utils/cookies/keys';
import {getCookies} from '../../../src/utils/cookies/utils';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';


type QuestEditProps = {
  response: QuestPostGetResponse,
}

export const getServerSideProps: GetServerSideProps<QuestEditProps> = async (context) => {
  const {pid, lang} = context.query;

  const googleUid = getCookies(CookiesKeys.GOOGLE_UID, context.req.cookies);
  if (!googleUid) {
    // FIXME: Change redirection destination - user not logged in yet
    return {
      redirect: {
        permanent: false,
        destination: GeneralPath.HOME,
      },
    };
  }

  const response = await ApiRequestSender.questGet(
    googleUid,
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

const QuestEdit = ({response}: QuestEditProps) => {
  return <QuestEditForm post={response}/>;
};

export default QuestEdit;

