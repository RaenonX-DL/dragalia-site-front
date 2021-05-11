import React from 'react';

import {Route} from 'react-router-dom';

import {RouteProps} from './types';

export const PublicRoute = ({path, children}: React.PropsWithChildren<RouteProps>) => {
  return (
    <Route exact path={path}>{children}</Route>
  );
};
