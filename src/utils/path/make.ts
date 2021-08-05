import {SupportedLanguages} from '../../api-def/api';
import {PostPath, UnitPath} from '../../const/path/definitions';


const generateUrl = (path: string, args: { [key in string]: string | number }) => {
  Object
    .keys(args)
    .forEach((key) => {
      path = path.replace(`[${key}]`, args[key].toString());
    });

  return path;
};

type PathArgs = {
  lang: SupportedLanguages,
}

// Needs to match the key names used in `PostPath`
type PostPathArgs = PathArgs & {
  pid: number,
}

export const makePostUrl = (path: PostPath, args: PostPathArgs) => {
  return generateUrl(`/${args.lang}${path}`, args);
};

// Needs to match the key names used in `UnitPath`
type UnitPathArgs = PathArgs & {
  id: number,
}

export const makeUnitUrl = (path: UnitPath, args: UnitPathArgs) => {
  return generateUrl(`/${args.lang}${path}`, args);
};
