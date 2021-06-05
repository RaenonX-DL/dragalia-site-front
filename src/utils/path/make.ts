import {SupportedLanguages} from '../../api-def/api';
import {GeneralPath, PathRoot, PostPath} from '../../const/path/definitions';

type PathArgs = {
  lang: SupportedLanguages,
}

const makePath = (path: string) => {
  return `${PathRoot}${path}`;
};

// FIXME: Remove path utils?

const generatePath = (path: string, args: {[key in string]: string | number}) => {
  Object.keys(args).forEach((key) => path.replace(`:${key}`, args[key].toString()));

  return path;
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
