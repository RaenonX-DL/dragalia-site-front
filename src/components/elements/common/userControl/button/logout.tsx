import React from 'react';

import {signOut} from 'next-auth/react';
import Button from 'react-bootstrap/Button';

import {useI18n} from '../../../../../i18n/hook';
import {useNextRouter} from '../../../../../utils/router';


export const LogoutButton = () => {
  const {t} = useI18n();
  const {asPath} = useNextRouter();

  return (
    <Button variant="outline-info" onClick={() => signOut({callbackUrl: asPath})} className="bg-gradient">
      {t((t) => t.userControl.logout)}
    </Button>
  );
};
