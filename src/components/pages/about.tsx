import React from 'react';
import {useTranslation} from 'react-i18next';

import {PageProps} from './base';

export const About = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  fnSetTitle(t('pages.name.about'));

  return (
    <a>
      <h2>
        <a href="https://github.com/RaenonX-DL/dragalia-site-front" target="_blank" rel="noreferrer">
          Github Repo (Frontend)
        </a>
      </h2>
      <h2>
        <a href="https://github.com/RaenonX-DL/dragalia-site-back" target="_blank" rel="noreferrer">
          Github Repo (Backend)
        </a>
      </h2>
    </a>
  );
};
