import React from 'react';

import {useI18n} from '../../i18n/hook';
import {Markdown} from '../elements/markdown/main';
import {PageProps} from './props';

export const Constructing = ({fnSetTitle}: PageProps) => {
  const {t} = useI18n();

  if (fnSetTitle) {
    fnSetTitle(t((t) => t.pages.name.constructing));
  }

  return (
    <Markdown>
      {t((t) => t.pages.constructing)}
    </Markdown>
  );
};
