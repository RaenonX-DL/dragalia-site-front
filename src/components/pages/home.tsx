import React from 'react';
import {useTranslation} from 'react-i18next';

import {PageProps} from './base';

export const Home = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  fnSetTitle(t('pages.name.home'));

  return (
    <h2>Home</h2>
  );
};
