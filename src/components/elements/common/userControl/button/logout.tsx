import React from 'react';

import {signOut} from 'next-auth/client';
import {Button} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';


export const LogoutButton = () => {
  const {t} = useI18n();

  return (
    <Button variant="outline-info" onClick={() => signOut()}>
      {t((t) => t.userControl.logout)}
    </Button>
  );
};
