import {SupportedLanguages} from '../../api-def/api';
import {PostPath} from '../../const/path/definitions';


const generatePath = (path: string, args: { [key in string]: string | number }) => {
  Object
    .keys(args)
    .forEach((key) => {
      path = path.replace(`[${key}]`, args[key].toString());
    });

  return path;
};

type PostPathArgs = {
  lang: SupportedLanguages,
  pid: number,
}

export const makePostPath = (path: PostPath, args: PostPathArgs) => {
  return generatePath(`/${args.lang}${path}`, args);
};
