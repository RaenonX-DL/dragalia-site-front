import {SupportedLanguages} from '../../api-def/api';
import {translation as translationCHT} from './cht/translation';
import {TranslationStruct} from './definition';
import {translation as translationEN} from './en/translation';
import {translation as translationJP} from './jp/translation';


export const translations: {[lang in SupportedLanguages]: TranslationStruct} = {
  [SupportedLanguages.CHT]: translationCHT,
  [SupportedLanguages.EN]: translationEN,
  [SupportedLanguages.JP]: translationJP,
};
