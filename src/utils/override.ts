import {DeepPartial} from './types';


type OverrideOptions = {
  originalOnly?: boolean,
};

export const overrideObject = <T, >(
  original: T,
  override?: DeepPartial<T> | null,
  options?: OverrideOptions,
): T => {
  if (!override) {
    return original;
  }

  const originalEntries = Object.entries(original);
  const originalKeys = originalEntries.map((entry) => entry[0]);
  const overrideEntriesToAdd = Object.entries(override)
    .filter(([key, _]) => !(originalKeys.includes(key)));

  const objEntries = originalEntries
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
    });

  if (!options?.originalOnly) {
    objEntries.push(...overrideEntriesToAdd);
  }

  return Object.fromEntries(objEntries) as T;
};
