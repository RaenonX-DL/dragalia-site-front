export enum PostPath {
  QUEST = '/quest/:pid(\\d+)',
  QUEST_EDIT = '/quest/:pid(\\d+)/edit',
  ANALYSIS = '/analysis/:pid(\\d+)',
  ANALYSIS_EDIT = '/analysis/:pid(\\d+)/edit',
  MISC = '/misc/:pid(\\d+)',
}

export enum GeneralPath {
  ROOT = '/:lang',
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
  PRINT = '/print',
  SKILL_ATK = '/skill/atk',
  SKILL_SUP = '/skill/sup',
  STORY = '/story',
  // Tools
  ROTATION_CALC = '/rotations',
  // Not game related
  ABOUT = '/about',
  SPECIAL_THANKS = '/thanks',
}

export type Path = PostPath | GeneralPath;
