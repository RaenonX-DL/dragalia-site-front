import React from 'react';
import {useTranslation} from 'react-i18next';

import {PageProps} from './base';
import {Markdown} from '../elements';

export const Home = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  fnSetTitle(t('pages.name.home'));

  return (
    <>
      <Markdown>{t('pages.welcome')}</Markdown>
    </>
  );
};
