import React from 'react';

import {useTranslation} from '../../i18n/utils';
import {PageProps} from './props';

export const About = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  fnSetTitle(t('pages.name.about'));

  return (
    <>
      <h3>
        <a href="https://github.com/RaenonX-DL/dragalia-site-front" target="_blank" rel="noreferrer">
          Github Repo (Frontend)
        </a>
      </h3>
      <h3>
        <a href="https://github.com/RaenonX-DL/dragalia-site-back" target="_blank" rel="noreferrer">
          Github Repo (Backend - Legacy)
        </a>
      </h3>
      <h3>
        <a href="https://github.com/RaenonX-DL/dragalia-site-back-2" target="_blank" rel="noreferrer">
          Github Repo (Backend)
        </a>
      </h3>
    </>
  );
};
