export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<any> ? T[K] : DeepPartial<T[K]>;
};
