import {SupportedLanguages} from '../../api-def/api';
import {PostPath} from '../../const/path/definitions';

// FIXME: Check usages (makePat should not be necessary)

const generatePath = (path: string, args: { [key in string]: string | number }) => {
  Object.keys(args).forEach((key) => path = path.replace(`:${key}`, args[key].toString()));

  return path;
};

export const makeLangSensitivePath = (path: string, lang: SupportedLanguages) => {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  return `/${lang}${path}`;
};

type PostPathArgs = {
  pid: number,
}

export const makePostPath = (path: PostPath, args: PostPathArgs) => {
  return generatePath(path, args);
};
