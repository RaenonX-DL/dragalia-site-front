import {TranslationStruct} from './translations/definition';
import {GetTranslationFunction, TFunction} from './types';


export const getTranslationString = (
  translation: TranslationStruct,
): TFunction => (
  getEntryFn: GetTranslationFunction,
  replacements: { [key in string]: string } = {},
): string => {
  const entry = getEntryFn(translation);

  const replacer = (original: string, key: string) => {
    const newValue = replacements[key];

    if (!newValue) {
      const errorMessage = `Placeholder of key [${key}] does not exist in string: "${entry}"`;

      if (process.env.NODE_ENV === 'development') {
        throw new Error(errorMessage);
      } else {
        console.warn(errorMessage);
      }

      return original;
    }

    return newValue;
  };

  return entry.replace(/{{(\w+)}}/g, replacer);
};
