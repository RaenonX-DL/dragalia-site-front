import {SupportedLanguages} from '../../api-def/api';
import {DataPath, GeneralPath, PostPath, StoryPath, UnitPath} from '../../const/path/definitions';


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

export const makeGeneralUrl = (path: GeneralPath, args: PathArgs) => {
  return generateUrl(`/${args.lang}${path}`, args);
};

// Needs to match the key names used in `DataPath`
type DataPathArgs = PathArgs & {
  id: string,
}

export const makeDataUrl = (path: DataPath, args: DataPathArgs) => {
  return generateUrl(`/${args.lang}${path}`, args);
};

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

// Needs to match the key names used in `StoryPath`
type StoryPathArgs = PathArgs & {
  id: number,
}

export const makeStoryUrl = (path: StoryPath, args: StoryPathArgs) => {
  return generateUrl(`/${args.lang}${path}`, args);
};
