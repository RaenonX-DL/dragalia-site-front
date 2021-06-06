// Must and only have `pid` as the key
export enum PostPath {
  QUEST = `/quest/[pid]`,
  QUEST_EDIT = '/quest/[pid]/edit',
  ANALYSIS = '/analysis/[pid]',
  ANALYSIS_EDIT = '/analysis/[pid]/edit',
  MISC = '/misc/[pid]',
}

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

export type PagePath = PostPath | GeneralPath;

export const isPagePath = (path: string): path is PagePath => {
  return allPaths.includes(path as PagePath);
};
