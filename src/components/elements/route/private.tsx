import React from 'react';

import {Route} from 'react-router-dom';

import {CookiesControl} from '../../../utils/cookies';
import {makeRoutePath} from '../../../utils/path';
import {LoginPrompt} from '../common/googleSignin/loginPrompt';
import {RouteProps} from './types';

const PrivateRouteRender = ({children}: React.PropsWithChildren<{}>) => {
  // TEST: Private route
  //  - Logged in user can access a certain page
  //  - Anonymous user to be prompt to login

  if (CookiesControl.getGoogleUid()) {
    return <>{children}</>;
  }

  return <LoginPrompt/>;
};

export const PrivateRoute = ({path, children}: React.PropsWithChildren<RouteProps>) => {
  return (
    <Route
      exact path={makeRoutePath(path)}
      render={() => <PrivateRouteRender>{children}</PrivateRouteRender>}
    />
  );
};
