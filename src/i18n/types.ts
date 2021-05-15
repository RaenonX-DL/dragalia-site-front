import {TranslationStruct} from './translations/definition';

export type LanguageCode = string | undefined;

export type DetectorFunction = () => LanguageCode;

export type Translation = string;

export type GetTranslationFunction = (translation: TranslationStruct) => Translation;

export type TFunction = (getTransFn: GetTranslationFunction, replacements?: { [key in string]: string }) => string;
