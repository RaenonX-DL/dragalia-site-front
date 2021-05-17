import React from 'react';

import {useI18n} from '../../i18n/hook';
import {Markdown} from '../elements/markdown/main';
import {PageProps} from './props';

export const Constructing = ({fnSetTitle}: PageProps) => {
  const {t} = useI18n();

  if (fnSetTitle) {
    fnSetTitle(t((t) => t.meta.temp.constructing.title));
  }

  return (
    <Markdown>
      {t((t) => t.message.info.constructing)}
    </Markdown>
  );
};
