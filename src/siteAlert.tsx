import React from 'react';

import {Alert} from 'react-bootstrap';

import {Markdown} from './components/elements/markdown/main';
import {useI18n} from './i18n/hook';

export const SiteAlert = () => {
  const {t} = useI18n();

  return (
    <>
      <Alert variant="info" className="mb-0 py-0">
        <Markdown>
          {t((t) => t.message.alert.ads)}
        </Markdown>
      </Alert>
      <Alert variant="warning" className="py-0">
        <Markdown>
          {t((t) => t.message.alert.migration)}
        </Markdown>
      </Alert>
    </>
  );
};
