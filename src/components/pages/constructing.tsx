import React from 'react';
import {useTranslation} from 'react-i18next';

import {PageProps} from './base';
import {Markdown} from '../elements/markdown';

export const Constructing = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  if (fnSetTitle) {
    fnSetTitle(t('pages.name.constructing'));
  }

  return (
    <Markdown>{t('pages.constructing')}</Markdown>
  );
};
