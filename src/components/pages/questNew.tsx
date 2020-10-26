import React from 'react';
import {useTranslation} from 'react-i18next';

import {QuestNewPostForm} from '../elements/questNewPostForm';
import {PageProps} from './base';

export const QuestNew = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  fnSetTitle(t('pages.name.quest_new'));

  return (
    <QuestNewPostForm/>
  );
};
