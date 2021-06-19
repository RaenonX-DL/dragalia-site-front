declare module '*.module.css';

type UnwrapPromise<T> = T extends PromiseLike<infer U> ? UnwrapPromise<U> : T
