import React from 'react';
import {useTranslation} from 'react-i18next';

import {Markdown} from '../elements/markdown';

export const NotImplemented = () => {
  const {t} = useTranslation();

  document.title = t('pages.title.not_implemented');

  return (
    <Markdown>{t('pages.not_implemented')}</Markdown>
  );
};
