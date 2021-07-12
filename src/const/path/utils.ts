import {allPaths, PagePath, PostPath, UnitPath} from './definitions';


export const isUnitPath = (path: string): path is UnitPath => {
  return Object.values(UnitPath).some((unitPath) => unitPath === path);
};

export const isPostPath = (path: string): path is PostPath => {
  return Object.values(PostPath).some((postPath) => postPath === path);
};

export const isPagePath = (path: string): path is PagePath => {
  return allPaths.some((pagePath) => pagePath === path);
};
