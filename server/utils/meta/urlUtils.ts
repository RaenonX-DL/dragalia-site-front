import {match} from 'react-router';
import {matchPath} from 'react-router-dom';

import {ApiResponseCode, FailedResponse, SupportedLanguages} from '../../../src/api-def/api';
import {allActualPaths, isPostPath, PagePath, PathRoot, toNeutralPath} from '../../../src/const/path/definitions';
import {isMatchPostParams, PathParams} from '../../../src/const/path/params';
import {mapToSupportedLang} from '../../../src/i18n/langCode';
import {ApiRequestSender} from '../../../src/utils/services/api/requestSender';
import {pathPostType} from './lookup';


export const getLangFromUrl = (url: string): SupportedLanguages => {
  const langMatch = matchPath<PathParams>(url, PathRoot);

  return mapToSupportedLang(langMatch ? langMatch.params.lang : null);
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

  // No matching path - 404 page
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
