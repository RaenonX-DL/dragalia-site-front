import {PageMetaResponse} from '../api-def/api';
import {TranslationStruct} from './translations/definition';


export type InterpolateParams = PageMetaResponse['params'];

export type LanguageCode = string | undefined;

export type DetectorFunction = () => LanguageCode;

export type GetTranslationFunction<T = string> = (translation: TranslationStruct) => T;

export type TFunction<T = string> = (
  getTransFn: GetTranslationFunction<T>,
  replacements?: InterpolateParams,
) => T;
