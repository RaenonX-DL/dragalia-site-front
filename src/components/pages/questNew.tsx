import React from 'react';
import {useTranslation} from 'react-i18next';

import {QuestNewPostForm} from '../elements/questNewPostForm';

export const QuestNew = () => {
  const {t} = useTranslation();

  document.title = t('pages.title.quest_new');

  return (
    <QuestNewPostForm/>
  );
};
