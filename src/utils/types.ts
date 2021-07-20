export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<any> ? T[K] : DeepPartial<T[K]>;
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
