import React from 'react';

import {signOut} from 'next-auth/client';
import {Button} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {useNextRouter} from '../../../../../utils/router';


export const LogoutButton = () => {
  const {t} = useI18n();
  const {asPath} = useNextRouter();

  return (
    <Button variant="outline-info" onClick={() => signOut({callbackUrl: asPath})}>
      {t((t) => t.userControl.logout)}
    </Button>
  );
};
