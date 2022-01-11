export type ArrayFormCommonProps<P, E> = {
  payload: P,
  minLength: number,
  getArray: (payload: P) => Array<E>,
  setArray: (newArray: Array<E>) => void,
  elemCount?: number,
  showMoveButton?: boolean,
  vertical?: boolean,
};

export type ArrayFormOnChangeHandler<E> = <K extends keyof E>(key: K) => (newValue: E[K]) => void;
