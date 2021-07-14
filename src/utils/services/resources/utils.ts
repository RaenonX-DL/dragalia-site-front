import {SupportedLanguages} from '../../../api-def/api/other/lang';
import {EnumEntry} from '../../../api-def/resources';


export const reverseEnumLookup = (
  enums: Array<EnumEntry>, targetCode: number,
): EnumEntry | undefined => {
  return enums.find((entry) => entry.code === targetCode);
};

export const reverseEnumTransLookup = (
  enums: Array<EnumEntry>, targetCode: number, lang: SupportedLanguages, onNotFound: string,
): string => {
  return reverseEnumLookup(enums, targetCode)?.trans[lang] || onNotFound;
};
