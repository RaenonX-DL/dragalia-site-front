import {SupportedLanguages} from '../../../api-def/api/other/lang';
import {EnumEntry} from '../../../api-def/resources';


export const reverseEnumTransLookup = (
  enums: Array<EnumEntry>, targetCode: number, lang: SupportedLanguages, onNotFound: string,
): string => {
  return enums.find((entry) => entry.code === targetCode)?.trans[lang] || onNotFound;
};
