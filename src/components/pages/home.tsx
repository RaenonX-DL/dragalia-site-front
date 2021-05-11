import React from 'react';

import {useTranslation} from '../../i18n/utils';
import {Markdown} from '../elements';
import {PageProps} from './props';

export const Home = ({fnSetTitle}: PageProps) => {
  const {t} = useTranslation();

  fnSetTitle(t('pages.name.home'));

  return (
    <Markdown>
      {t('pages.welcome')}
    </Markdown>
  );
};
