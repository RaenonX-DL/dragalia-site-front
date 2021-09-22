export const PATH_ROOT = '/[lang]';

// Must and only have `id` as the key for data ID
export enum DataPath {
  TIER_KEY_POINT = '/tier/points/[id]',
}

// Must and only have `id` as the key for story ID
export enum StoryPath {
  STORY_UNIT = '/story/unit/[id]',
  STORY_MAIN = '/story/main/[id]',
  STORY_EVENT = '/story/event/[id]',
}

// Must and only have `id` as the key for unit ID
export enum UnitPath {
  UNIT_INFO = '/info/[id]',
  UNIT_TIER_EDIT = '/tier/edit/[id]'
}

// Must and only have `pid` as the key for post identifier
export enum PostPath {
  QUEST = '/quest/[pid]',
  QUEST_EDIT = '/quest/[pid]/edit',
  ANALYSIS = '/analysis/[pid]',
  ANALYSIS_EDIT = '/analysis/[pid]/edit',
  MISC = '/misc/[pid]',
  MISC_EDIT = '/misc/[pid]/edit',
}

export enum GeneralPath {
  // Home
  HOME = '/',
  // Posts
  QUEST_LIST = '/quest',
  QUEST_NEW = '/quest/new',
  MISC_LIST = '/misc',
  MISC_NEW = '/misc/new',
  ANALYSIS_LIST = '/analysis',
  ANALYSIS_NEW_CHARA = '/analysis/new/chara',
  ANALYSIS_NEW_DRAGON = '/analysis/new/dragon',
  TIER_LOOKUP = '/tier',
  TIER_POINTS_INDEX = '/tier/points',
  TIER_POINTS_EDIT = '/tier/points/edit',
  // In-game data
  EX = '/ex',
  INFO_LOOKUP = '/info',
  SKILL_ATK = '/skill/atk',
  SKILL_SUP = '/skill/sup',
  STORY = '/story',
  // Tools
  ROTATION_CALC = '/rotations',
  // Others
  UPDATE_UNIT_NAME_REF = '/name',
  // Not game related
  ABOUT = '/about',
  SPECIAL_THANKS = '/thanks',
}

export enum AuthPath {
  SIGN_IN = '/auth/signin'
}

export const allPaths = ([] as Array<PagePath>).concat(
  ...[DataPath, UnitPath, PostPath, StoryPath, GeneralPath, AuthPath].map(
    (paths) => Object.values(paths),
  ),
);

export type PagePath = DataPath | UnitPath | PostPath | StoryPath | GeneralPath | AuthPath;
