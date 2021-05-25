import {generatePath, useLocation} from 'react-router-dom';

import {SupportedLanguages} from '../../api-def/api';
import {GeneralPath, PagePath, PathRoot, PostPath} from '../../const/path/definitions';
import {getLangFromUrl} from './utils';

export const getParamValue = (paramName: string, defaultValue?: string): string | undefined => {
  const location = useLocation();

  return new URLSearchParams(location.search).get(paramName) || defaultValue;
};

type PathArgs = {
  lang: SupportedLanguages,
}

const makePath = (path: string) => {
  return `${PathRoot}${path}`;
};

export const makeRoutePath = (path: PagePath) => {
  return makePath(path);
};

export const makeSimplePath = (path: GeneralPath, args: PathArgs) => {
  return generatePath(makePath(path), args);
};

type PostPathArgs = PathArgs & {
  pid: number,
}

export const makePostPath = (path: PostPath, args: PostPathArgs) => {
  return generatePath(makePath(path), args);
};

export const patchLanguageToPath = (path: string, lang: SupportedLanguages) => {
  // If language found in path - don't patch
  if (getLangFromUrl(path, () => null)) {
    return path;
  }

  return generatePath(makePath(path), {lang});
};
