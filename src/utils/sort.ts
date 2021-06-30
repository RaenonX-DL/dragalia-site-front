type SortOptions<T> = {
  getComparer: (element: T) => number,
  isToPutLast?: (element: T) => boolean,
};

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

export const sortAscending = <T>({getComparer, isToPutLast}: SortOptions<T>) => (a: T, b: T) => {
  const putLastReturn = putLast(a, b, isToPutLast);
  if (putLastReturn) {
    return putLastReturn;
  }

  return getComparer(a) - getComparer(b);
};

export const sortDescending = <T>({getComparer, isToPutLast}: SortOptions<T>) => (a: T, b: T) => {
  const putLastReturn = putLast(a, b, isToPutLast);
  if (putLastReturn) {
    return putLastReturn;
  }

  return getComparer(b) - getComparer(a);
};
