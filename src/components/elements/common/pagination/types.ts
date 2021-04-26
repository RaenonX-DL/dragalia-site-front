export enum SpecialKey {
  FIRST = -1,
  PREV = -2,
  NEXT = -3,
  LAST = -4,
}

export type PaginationState = {
  currentPage: number,
  currentStart: number,
  maxPage: number,
  pageLimit: number,
}
