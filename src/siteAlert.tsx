import React from 'react';

import {Alert} from 'react-bootstrap';

import {Markdown} from './components/elements/markdown/main';
import {useTranslation} from './i18n/utils';

export const SiteAlert = () => {
  const {t} = useTranslation();

  return (
    <Alert variant="info"><Markdown>{t('message.info.ads')}</Markdown></Alert>
  );
};
