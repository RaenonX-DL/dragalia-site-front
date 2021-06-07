import React from 'react';

import {Button} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';


export const LoadingButton = () => {
  const {t} = useI18n();

  return (
    <Button variant="outline-secondary" disabled>
      {t((t) => t.googleSignin.loading)}
    </Button>
  );
};
