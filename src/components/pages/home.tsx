import React from 'react';
import {useTranslation} from 'react-i18next';

export const Home = () => {
  const {t} = useTranslation();

  document.title = t('pages.title.home');

  return (
    <h2>Home</h2>
  );
};
