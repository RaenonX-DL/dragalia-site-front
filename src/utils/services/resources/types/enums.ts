import {MultiLangText} from './text';


export type EnumEntry = {
  name: string,
  code: number,
  trans: MultiLangText
}


export type ConditionEnums = {
  afflictions: Array<EnumEntry>,
  elements: Array<EnumEntry>,
}


export type ElementEnums = {
  elemental: Array<EnumEntry>,
}
