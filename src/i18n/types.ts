import {TranslationStruct} from './translations/definition';

export type InterpolateParams = { [key in string]: string };

export type LanguageCode = string | undefined;

export type DetectorFunction = () => LanguageCode;

export type GetTranslationFunction<T = string> = (translation: TranslationStruct) => T;

export type TFunction<T = string> = (
  getTransFn: GetTranslationFunction<T>,
  replacements?: InterpolateParams,
) => T;
