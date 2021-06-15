import React from 'react';

import {AppReactContext} from '../../../context/app/main';
import {AccessDenied} from './accessDenied';


export const ProtectedLayout = ({children}: React.PropsWithChildren<{}>) => {
  const context = React.useContext(AppReactContext);

  if (!context?.session?.user.isAdmin) {
    return <AccessDenied/>;
  }

  return <>{children}</>;
};
