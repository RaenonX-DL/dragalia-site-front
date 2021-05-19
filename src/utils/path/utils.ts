import {match} from 'react-router';
import {matchPath} from 'react-router-dom';

import {ApiResponseCode, FailedResponse, SupportedLanguages} from '../../api-def/api';
import {allActualPaths, isPostPath, PagePath, PathRoot, toNeutralPath} from '../../const/path/definitions';
import {isMatchPostParams, PathParams} from '../../const/path/params';
import {mapToSupportedLang} from '../../i18n/langCode';
import {ApiRequestSender} from '../services/api/requestSender';
import {pathPostType} from './lookup';


export const getLangFromUrl = <T = SupportedLanguages>(url: string, onNotFound?: () => T): SupportedLanguages | T => {
  const langMatch = matchPath<PathParams>(url, PathRoot);

  if (!langMatch) {
    if (onNotFound) {
      return onNotFound();
    }
    return mapToSupportedLang(null);
  }

  return mapToSupportedLang(langMatch.params.lang);
};

type NeutralPathReturn = {
  match: match<PathParams> | null,
  path: PagePath | null,
}

export const getNeutralPathFromUrl = (url: string): NeutralPathReturn => {
  const match = matchPath<PathParams>(url, {
    path: allActualPaths,
    exact: true,
  });

  // No matching path
  if (!match) {
    return {match, path: null};
  }

  // Convert to neutral path
  return {match, path: toNeutralPath(match.path)};
};

export const isMetaResponseFailure = (response: any): response is FailedResponse => {
  return !!response.code && response.code !== ApiResponseCode.SUCCESS;
};

export const getMetaDataPromise = (
  googleUid: string,
  lang: SupportedLanguages,
  url: string,
  {path, match}: NeutralPathReturn,
) => {
  let responsePromise = ApiRequestSender.getPageMeta(googleUid);

  if (isPostPath(path) && isMatchPostParams(match)) {
    responsePromise = ApiRequestSender.getPostMeta(
      googleUid,
      lang,
      pathPostType[path],
      Number(match.params.pid),
    );
  }

  return responsePromise;
};
