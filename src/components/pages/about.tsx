import React from 'react';
import {useTranslation} from 'react-i18next';

export const About = () => {
  const {t} = useTranslation();

  document.title = t('pages.title.about');

  return (
    <h2>About</h2>
  );
};
