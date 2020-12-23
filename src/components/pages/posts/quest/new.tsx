import React from 'react';
import {useTranslation} from 'react-i18next';
import {ApiRequestSender} from '../../../../utils/services/api';

import {QuestPostForm} from '../../../elements';
import {PageProps} from '../../base';

export const QuestNew = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  fnSetTitle(t('pages.name.quest_new'));

  const handleSubmit = (payload) => ApiRequestSender.questPostPublish(payload);

  return (
    <QuestPostForm fnSendRequest={handleSubmit}/>
  );
};
