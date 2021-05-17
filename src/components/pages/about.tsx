import React from 'react';

import {useI18n} from '../../i18n/hook';
import {PageProps} from './props';

export const About = ({fnSetTitle}: PageProps) => {
  const {t} = useI18n();

  fnSetTitle(t((t) => t.meta.inUse.about.title));

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
