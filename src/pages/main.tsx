import React from 'react';

import {Redirect, Route, Switch} from 'react-router-dom';

import {RouteRestHandler} from '../components/elements/route/rest';
import {allActualPaths, allPaths, PathRoot} from '../const/path/definitions';
import {LanguageHandler} from '../i18n/handle';
import {patchLanguageToPath} from '../utils/path/make';
import {PageContentGameData} from './gameData';
import {PageContentPost} from './post';
import {PageContentSite} from './site';
import {PageContentTools} from './tools';
import {PageContentProps} from './types';

export const PageContent = ({updatePageTitle}: PageContentProps) => {
  return (
    <Switch>
      <Route path={PathRoot}>
        <LanguageHandler/>

        <PageContentSite updatePageTitle={updatePageTitle}/>
        <PageContentPost updatePageTitle={updatePageTitle}/>
        <PageContentGameData updatePageTitle={updatePageTitle}/>
        <PageContentTools updatePageTitle={updatePageTitle}/>

        <RouteRestHandler
          updatePageTitle={updatePageTitle}
          paths={allActualPaths}
          onMatch={() => <></>}
        />
      </Route>

      <RouteRestHandler
        updatePageTitle={updatePageTitle}
        paths={allPaths}
        onMatch={(match, lang) => (
          <Redirect to={patchLanguageToPath(match.url, lang)}/>
        )}
        callGA
      />
    </Switch>
  );
};
