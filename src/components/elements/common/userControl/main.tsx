import React from 'react';

import {useSession} from 'next-auth/client';

import {LoadingButton} from './button/loading';
import {LoginButton} from './button/login';
import {LogoutButton} from './button/logout';


export const UserControlButton = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <LoadingButton/>;
  }

  if (!session) {
    return <LoginButton/>;
  }

  return <LogoutButton/>;
};
