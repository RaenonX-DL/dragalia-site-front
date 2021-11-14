export const swapItem = <T, >(array: Array<T>, idxA: number, idxB: number) => {
  array[idxA] = array.splice(idxB, 1, array[idxA])[0];
  return array;
};
