import React from 'react';
import {useTranslation} from 'react-i18next';
import {Markdown} from '../elements';

import {PageProps} from './base';

export const Home = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  fnSetTitle(t('pages.name.home'));

  return (
    <>
      <Markdown>{t('pages.welcome')}</Markdown>
    </>
  );
};
