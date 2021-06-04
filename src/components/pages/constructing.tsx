import React from 'react';

import {useI18n} from '../../i18n/hook';
import {Markdown} from '../elements/markdown/main';


export const Constructing = () => {
  const {t} = useI18n();

  return (
    <Markdown>
      {t((t) => t.message.info.constructing)}
    </Markdown>
  );
};
