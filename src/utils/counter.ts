export const getElementCounter = <T, >(arr: Array<T>): Map<T, number> => {
  // Obtained from https://stackoverflow.com/a/57028486/11571888
  return arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
};
