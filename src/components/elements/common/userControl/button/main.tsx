import React from 'react';

import {useSession} from 'next-auth/react';

import {AuthPath} from '../../../../../api-def/paths';
import {useNextRouter} from '../../../../../utils/router';
import {AuthLoadingButton} from './loading';
import {LoginButton} from './login';
import {LogoutButton} from './logout';


export const UserControlButton = () => {
  const {pathname} = useNextRouter();
  const {status} = useSession();

  if (pathname === AuthPath.SIGN_IN) {
    return <></>;
  }

  if (status === 'unauthenticated') {
    return <LoginButton/>;
  }

  if (status === 'authenticated') {
    return <LogoutButton/>;
  }

  return <AuthLoadingButton/>;
};
