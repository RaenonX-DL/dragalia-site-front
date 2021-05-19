import React from 'react';

import {PublicRoute} from '../components/elements/route/public';
import {Constructing} from '../components/pages/constructing';
import {GeneralPath} from '../const/path/definitions';
import {PageContentProps} from './types';

export const PageContentTools = ({updatePageTitle}: PageContentProps) => {
  return (
    <PublicRoute path={GeneralPath.ROTATION_CALC}>
      <Constructing fnSetTitle={updatePageTitle}/>
    </PublicRoute>
  );
};
