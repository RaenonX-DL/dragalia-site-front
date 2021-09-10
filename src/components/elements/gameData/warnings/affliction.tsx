import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {useI18n} from '../../../../i18n/hook';


export const AfflictionWarning = () => {
  const {t} = useI18n();

  return (
    <Alert variant="info" className="section mb-2">
      {t((t) => t.game.skillAtk.info.affliction)}
    </Alert>
  );
};
