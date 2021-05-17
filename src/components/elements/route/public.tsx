import React from 'react';

import {Route} from 'react-router-dom';

import {makeRoutePath} from '../../../utils/path';
import {RouteProps} from './types';

export const PublicRoute = ({path, children}: React.PropsWithChildren<RouteProps>) => {
  return (
    <Route exact path={makeRoutePath(path)}>{children}</Route>
  );
};
