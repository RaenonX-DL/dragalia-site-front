import {SupportedLanguages} from '../../api-def/api/other/lang';

const langsRegex = Object.values(SupportedLanguages).join('|');

export const PathRoot = `/:lang(${langsRegex})`;

export enum PostPath {
  QUEST = `/quest/:pid(\\d+)`,
  QUEST_EDIT = '/quest/:pid(\\d+)/edit',
  ANALYSIS = '/analysis/:pid(\\d+)',
  ANALYSIS_EDIT = '/analysis/:pid(\\d+)/edit',
  MISC = '/misc/:pid(\\d+)',
}

export const isPostPath = (url: any): url is PostPath => {
  return Object.values(PostPath).includes(url);
};

export enum GeneralPath {
  // Home
  HOME = '/',
  // Posts
  QUEST_LIST = '/quest',
  QUEST_NEW = '/quest/new',
  ANALYSIS_LIST = '/analysis',
  ANALYSIS_NEW_CHARA = '/analysis/new/chara',
  ANALYSIS_NEW_DRAGON = '/analysis/new/dragon',
  MISC_LIST = '/misc',
  // In-game data
  EX = '/ex',
  SKILL_ATK = '/skill/atk',
  SKILL_SUP = '/skill/sup',
  STORY = '/story',
  // Tools
  ROTATION_CALC = '/rotations',
  // Not game related
  ABOUT = '/about',
  SPECIAL_THANKS = '/thanks',
}

export const allPaths = ([] as Array<PagePath>).concat(
  ...[PostPath, GeneralPath].map(
    (paths) => Object.values(paths),
  ),
);

export const allActualPaths = allPaths.map((path) => `${PathRoot}${path}`);

export type PagePath = PostPath | GeneralPath;

export const toNeutralPath = (path: string): PagePath | null => {
  if (!path.startsWith(PathRoot)) {
    return null;
  }

  path = path.replace(PathRoot, '');

  return allPaths.find((pathToCheck) => pathToCheck === path) || null;
};
