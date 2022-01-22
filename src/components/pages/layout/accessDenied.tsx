import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {useI18n} from '../../../i18n/hook';


export const AccessDenied = () => {
  const {t} = useI18n();

  return (
    <Alert variant="danger">
      {t((t) => t.meta.error['401'].description)}
    </Alert>
  );
};
