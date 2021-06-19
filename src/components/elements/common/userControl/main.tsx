import React from 'react';

import {AuthPath} from '../../../../const/path/definitions';
import {AppReactContext} from '../../../../context/app/main';
import {useNextRouter} from '../../../../utils/router';
import {LoginButton} from './button/login';
import {LogoutButton} from './button/logout';


export const UserControlButton = () => {
  const context = React.useContext(AppReactContext);
  const {pathname} = useNextRouter();

  if (pathname === AuthPath.SIGN_IN) {
    return <></>;
  }

  if (!context?.session) {
    return <LoginButton/>;
  }

  return <LogoutButton/>;
};
