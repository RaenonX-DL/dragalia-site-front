import {PostType} from '../../api-def/api';
import {allPaths, DataPath, PagePath, PostPath, UnitPath} from './definitions';


export const isDataPath = (path: string): path is DataPath => {
  return Object.values(DataPath).some((dataPath) => dataPath === path);
};

export const isUnitPath = (path: string): path is UnitPath => {
  return Object.values(UnitPath).some((unitPath) => unitPath === path);
};

export const isPostPath = (path: string): path is PostPath => {
  return Object.values(PostPath).some((postPath) => postPath === path);
};

export const isPagePath = (path: string): path is PagePath => {
  return allPaths.some((pagePath) => pagePath === path);
};

export const toPostPath: {[type in PostType]: PostPath} = {
  [PostType.ANALYSIS]: PostPath.ANALYSIS,
  [PostType.QUEST]: PostPath.QUEST,
  [PostType.MISC]: PostPath.MISC,
};
