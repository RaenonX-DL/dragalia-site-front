import React from 'react';
import {useTranslation} from 'react-i18next';

import {Markdown} from '../elements/markdown';

export const NotImplemented = () => {
  const {t} = useTranslation();

  return (<Markdown>{t('pages.not_implemented')}</Markdown>);
};
