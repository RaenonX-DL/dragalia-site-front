import {PostPath} from '../../const/path/definitions';

const generatePath = (path: string, args: { [key in string]: string | number }) => {
  Object.keys(args).forEach((key) => path = path.replace(`:${key}`, args[key].toString()));

  return path;
};

type PostPathArgs = {
  pid: number,
}

export const makePostPath = (path: PostPath, args: PostPathArgs) => {
  return generatePath(path, args);
};
