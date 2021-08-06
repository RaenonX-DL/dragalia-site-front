import {DeepPartial} from './types';


export const overrideObject = <T, >(original: T, override?: DeepPartial<T> | null): T => {
  if (!override) {
    return original;
  }

  return Object.fromEntries(Object
    .entries(original)
    .map(([key, value]) => {
      // !!value for `undefined` and `null` because those are typeof object
      if (!!value && typeof value === 'object' && !Array.isArray(value)) {
        const subOverride = override[key as keyof T];
        if (!subOverride) {
          return [key, value];
        }

        // Just use `subOverride` if `value` is an empty object.
        // Otherwise, call `overrideObject` on it.
        return [key, Object.keys(value).length ? overrideObject(value, subOverride) : subOverride];
      }

      const newValue = override[key as keyof T];

      return [key, newValue === undefined ? value : newValue];
    }),
  ) as T;
};
