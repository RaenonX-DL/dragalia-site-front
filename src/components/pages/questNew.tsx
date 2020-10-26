import React from 'react';
import {useTranslation} from 'react-i18next';

import {QuestPostForm} from '../elements';
import {PageProps} from './base';
import {ApiRequestSender} from '../../constants/api';

export const QuestNew = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  fnSetTitle(t('pages.name.quest_new'));

  const handleSubmit = (payload) => ApiRequestSender.questPostPublish(payload);

  return (
    <QuestPostForm handleSubmit={handleSubmit}/>
  );
};
