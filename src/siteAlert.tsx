import React from 'react';

import {Alert} from 'react-bootstrap';

import {Markdown} from './components/elements/markdown/main';
import {useI18n} from './i18n/hook';

export const SiteAlert = () => {
  const {t} = useI18n();

  return (
    <Alert variant="info"><Markdown>{t((t) => t.message.info.ads)}</Markdown></Alert>
  );
};
