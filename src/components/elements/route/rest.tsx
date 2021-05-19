import React from 'react';

import {match} from 'react-router';
import {matchPath, useLocation} from 'react-router-dom';

import {SupportedLanguages} from '../../../api-def/api';
import {useI18n} from '../../../i18n/hook';
import {PageContentProps} from '../../../pages/types';
import {GoogleAnalytics} from '../../../utils/services/ga';
import {Error404} from '../../pages/404';

type RestProps = PageContentProps & {
  paths: Array<string>,
  onMatch: (match: match, lang: SupportedLanguages) => JSX.Element,
  callGA?: boolean,
}

export const RouteRestHandler = ({paths, onMatch, updatePageTitle, callGA = false}: RestProps) => {
  const {t, lang} = useI18n();
  const location = useLocation();

  // Check if the current path is a match
  const match = matchPath(location.pathname, {
    path: paths,
    exact: true,
  });

  // Redirect for the legacy paths
  if (match) {
    return onMatch(match, lang);
  }

  // Returns 404 on non-redirectable paths
  // FIXME: Remove `callGA` when removing the use of `fnSetTitle`
  if (callGA) {
    GoogleAnalytics.pageViewFailed('not_found', location.pathname);
  } else {
    updatePageTitle(t((t) => t.meta.error['404'].title), false);
  }
  return <Error404/>;
};
