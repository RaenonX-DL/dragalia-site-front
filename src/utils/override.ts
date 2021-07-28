import {DeepPartial} from './types';


export const overrideObject = <T, >(original: T, override?: DeepPartial<T> | null): T => {
  if (!override) {
    return original;
  }

  return Object.fromEntries(Object
    .entries(original)
    .map(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const subOverride = override[key as keyof T];
        if (!subOverride) {
          return [key, value];
        }

        return [key, overrideObject(value, subOverride)];
      }

      return [key, override[key as keyof T] ?? value];
    }),
  ) as T;
};
