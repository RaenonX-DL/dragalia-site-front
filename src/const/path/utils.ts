import {generatePath, useLocation} from 'react-router-dom';

import {SupportedLanguages} from '../../api-def/api/other/lang';
import {GeneralPath, Path, PostPath} from './definitions';

export const getParamValue = (paramName: string, defaultValue?: string): string | undefined => {
  const location = useLocation();

  return new URLSearchParams(location.search).get(paramName) || defaultValue;
};

type PathArgs = {
  lang: SupportedLanguages,
}

const makePath = (path: Path) => {
  return `${GeneralPath.ROOT}${path}`;
};

export const makeRoutePath = (path: Path) => {
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
