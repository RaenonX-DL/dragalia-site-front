import React from 'react';

import {GetServerSideProps} from 'next';
import Cookies from 'universal-cookie';

import {QuestPostGetResponse, SupportedLanguages} from '../../../../src/api-def/api';
import {QuestEditForm} from '../../../../src/components/elements/posts/quest/form/edit';
import {CookiesKeys} from '../../../../src/const/cookies';
import {ApiRequestSender} from '../../../../src/utils/services/api/requestSender';

type QuestEditProps = {
  response: QuestPostGetResponse,
}

export const getServerSideProps: GetServerSideProps<QuestEditProps> = async (context) => {
  const {pid, lang} = context.query;

  // FIXME: Centralize cookies obtaining
  const cookies = new Cookies(context.req.cookies);
  const response = await ApiRequestSender.questGet(
    cookies.get(CookiesKeys.GOOGLE_UID),
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

