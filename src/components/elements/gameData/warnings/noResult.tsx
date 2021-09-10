import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {useI18n} from '../../../../i18n/hook';


export const NoResultWarning = () => {
  const {t} = useI18n();

  return (
    <Alert variant="danger" className="section mb-2">
      {t((t) => t.game.skillAtk.error.noResult)}
    </Alert>
  );
};
