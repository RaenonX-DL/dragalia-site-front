type SortOptions<T> = {
  getComparer: (element: T) => number,
  getComparerSecondary?: (element: T) => number,
  isToPutLast?: (element: T) => boolean,
};

type SortFunc<T> = (a: T, b: T) => number;

// Source code for putting last: https://stackoverflow.com/a/50933148/11571888
const putLast = <T>(a: T, b: T, isToPutLast: SortOptions<T>['isToPutLast'] | undefined) => {
  if (!isToPutLast) {
    return null;
  }

  if (isToPutLast(a)) {
    return 1;
  }
  if (isToPutLast(b)) {
    return -1;
  }

  return null;
};

export const sortAscending = <T>({
  getComparer, getComparerSecondary, isToPutLast,
}: SortOptions<T>): SortFunc<T> => (a: T, b: T) => {
  const putLastReturn = putLast(a, b, isToPutLast);
  if (putLastReturn) {
    return putLastReturn;
  }

  const comparerPrimaryA = getComparer(a);
  const comparerPrimaryB = getComparer(b);

  if (getComparerSecondary && comparerPrimaryA === comparerPrimaryB) {
    return getComparerSecondary(a) - getComparerSecondary(b);
  }

  return getComparer(a) - getComparer(b);
};

export const sortDescending = <T>({
  getComparer, getComparerSecondary, isToPutLast,
}: SortOptions<T>): SortFunc<T> => (a: T, b: T) => {
  const putLastReturn = putLast(a, b, isToPutLast);
  if (putLastReturn) {
    return putLastReturn;
  }

  const comparerPrimaryA = getComparer(a);
  const comparerPrimaryB = getComparer(b);

  if (getComparerSecondary && comparerPrimaryA === comparerPrimaryB) {
    return getComparerSecondary(b) - getComparerSecondary(a);
  }

  return getComparer(b) - getComparer(a);
};

export const sortFuncMerged = <T>(...funcList: SortFunc<T>[]): SortFunc<T> => (a: T, b: T) => {
  for (const func of funcList) {
    const result = func(a, b);

    if (result !== 0) {
      return result;
    }
  }

  return 0;
};
