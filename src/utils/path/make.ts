import {SupportedLanguages} from '../../api-def/api';
import {GeneralPath, PagePath, PathRoot, PostPath} from '../../const/path/definitions';

type PathArgs = {
  lang: SupportedLanguages,
}

const makePath = (path: string) => {
  return `${PathRoot}${path}`;
};

const generatePath = (path: string, args: {[key in string]: string | number}) => {
  Object.keys(args).forEach((key) => path.replace(`:${key}`, args[key].toString()));

  return path;
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
