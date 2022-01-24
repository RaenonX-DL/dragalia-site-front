export const swapItem = <T>(array: T[], idxA: number, idxB: number) => {
  array[idxA] = array.splice(idxB, 1, array[idxA])[0];
  return array;
};

export const removeDuplicates = <T>(array: T[], isSame: (a: T, b: T) => boolean) => {
  return array.filter((v, i, a) => a.findIndex((t) => isSame(t, v)) === i);
};
