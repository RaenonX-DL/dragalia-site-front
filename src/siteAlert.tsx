import React from 'react';
import {Alert} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {Markdown} from './components/elements/markdown/main';

export const SiteAlert = () => {
  const {t} = useTranslation();

  return (
    <Alert variant="info"><Markdown>{t('message.info.donation')}</Markdown></Alert>
  );
};
