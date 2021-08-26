import {SpecialKey} from './types';


export const getValidNewPage = (newPage: number, currentPage: number, maxPage: number) => {
  if (newPage === SpecialKey.FIRST) {
    return 1;
  }

  if (newPage === SpecialKey.PREV) {
    return Math.max(1, currentPage - 1);
  }

  if (newPage === SpecialKey.NEXT) {
    newPage = currentPage + 1;
    if (maxPage > 0) {
      newPage = Math.min(maxPage, newPage);
    }
    return newPage;
  }

  if (maxPage > 0 && newPage === SpecialKey.LAST) {
    return maxPage;
  }

  return newPage;
};

export const startIdxToPage = (startIdx: number, pageLimit: number) => {
  return Math.floor(startIdx / pageLimit) + 1;
};

export const countToMaxPage = (postCount: number, pageLimit: number) => {
  if (postCount <= 0) {
    return 0;
  }

  return startIdxToPage(postCount - 1, pageLimit);
};

export const pageToStartIdx = (page: number, pageLimit: number) => {
  return (page - 1) * pageLimit;
};
