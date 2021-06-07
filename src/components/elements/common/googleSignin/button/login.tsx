import React from 'react';

import {signIn} from 'next-auth/client';
import {Button} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';


export const LoginButton = () => {
  const {t} = useI18n();

  return (
    <Button variant="outline-success" onClick={() => signIn()}>
      {t((t) => t.googleSignin.login)}
    </Button>
  );
};
