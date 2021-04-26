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
  return Math.ceil(startIdx / pageLimit) + 1;
};

export const pageToStartIdx = (page: number, pageLimit: number) => {
  return (page - 1) * pageLimit;
};
