import {MultiLangText} from './text';


export type EnumEntry = {
  name: string,
  code: number,
  imagePath: string | null,
  trans: MultiLangText
}


export type ConditionEnumEntry = EnumEntry & {
  colorTheme: string
};


export type ConditionEnumMap = Record<string, ConditionEnumEntry>;


export type CategorizedConditionEnums = {
  afflictions: Array<EnumEntry>,
  elements: Array<EnumEntry>,
}


export type BuffParamEnums = {
  unit: Array<EnumEntry>,
}


export type ElementEnums = {
  elemental: Array<EnumEntry>,
}


export type ExBuffParams = {
  exBuffParam: Array<EnumEntry>,
  chainedExBuffParam: Array<EnumEntry>,
}
