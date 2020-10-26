import React from 'react';
import {useTranslation} from 'react-i18next';

import {PageProps} from './base';

export const About = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  fnSetTitle(t('pages.name.about'));

  return (
    <h2>About</h2>
  );
};
