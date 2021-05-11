import React from 'react';

import {useTranslation} from '../../i18n/utils';
import {Markdown} from '../elements/markdown/main';
import {PageProps} from './props';

export const Constructing = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  if (fnSetTitle) {
    fnSetTitle(t('pages.name.constructing'));
  }

  return (
    <Markdown>
      {t('pages.constructing')}
    </Markdown>
  );
};
