import {throwError} from '../utils/error';
import {PageMetaTranslations, TranslationStruct} from './translations/definition';
import {GetTranslationFunction, InterpolateParams, TFunction} from './types';


export const getTFunction = (
  translation: TranslationStruct,
): TFunction => (
  getEntryFn: GetTranslationFunction,
  replacements: InterpolateParams = {},
): string => {
  const entry = getEntryFn(translation);

  const replacer = (original: string, key: string) => {
    const newValue = replacements[key];

    if (!newValue) {
      const errorMessage = `Placeholder of key [${key}] does not exist in string: "${entry}"`;

      throwError(errorMessage);

      return original;
    }

    return newValue;
  };

  return entry.replace(/{{(\w+)}}/g, replacer);
};


export const getMetaTFunction = (
  translation: TranslationStruct,
): TFunction<PageMetaTranslations> => (
  getEntryFn: GetTranslationFunction<PageMetaTranslations>,
  replacements: InterpolateParams = {},
): PageMetaTranslations => {
  const t = getTFunction(translation);

  return {
    title: t((t) => getEntryFn(t).title, replacements),
    description: t((t) => getEntryFn(t).description, replacements),
  };
};
