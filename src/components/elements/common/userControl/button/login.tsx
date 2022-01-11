import React from 'react';

import Button from 'react-bootstrap/Button';

import {AuthPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';


export const LoginButton = () => {
  const {t} = useI18n();

  return (
    <Button variant="outline-success" href={AuthPath.SIGN_IN} className="bg-gradient">
      {t((t) => t.userControl.login)}
    </Button>
  );
};
