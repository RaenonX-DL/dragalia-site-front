import React from 'react';

import {useI18n} from '../../i18n/hook';
import {Markdown} from '../elements';
import {PageProps} from './props';

export const Home = ({fnSetTitle}: PageProps) => {
  const {t} = useI18n();

  fnSetTitle(t((t) => t.meta.inUse.home.title));

  return (
    <Markdown>
      {t((t) => t.message.info.welcome)}
    </Markdown>
  );
};
