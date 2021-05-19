import React from 'react';

import {PublicRoute} from '../components/elements/route/public';
import {About} from '../components/pages/about';
import {Home} from '../components/pages/home';
import {SpecialThanks} from '../components/pages/thanks';
import {GeneralPath} from '../const/path/definitions';
import {PageContentProps} from './types';

export const PageContentSite = ({updatePageTitle}: PageContentProps) => {
  return (
    <>
      <PublicRoute path={GeneralPath.HOME}>
        <Home fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <PublicRoute path={GeneralPath.ABOUT}>
        <About fnSetTitle={updatePageTitle}/>
      </PublicRoute>
      <PublicRoute path={GeneralPath.SPECIAL_THANKS}>
        <SpecialThanks fnSetTitle={updatePageTitle}/>
      </PublicRoute>
    </>
  );
};
