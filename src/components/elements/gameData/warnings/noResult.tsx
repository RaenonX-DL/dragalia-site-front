import React from 'react';

import Alert from 'react-bootstrap/Alert';

import {useI18n} from '../../../../i18n/hook';


export const NoResultWarning = () => {
  const {t} = useI18n();

  return (
    <Alert variant="danger" className="rounded bg-black-32 p-2 mb-2">
      {t((t) => t.game.skillAtk.error.noResult)}
    </Alert>
  );
};
