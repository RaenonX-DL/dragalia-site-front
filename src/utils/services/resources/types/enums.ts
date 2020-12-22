import {MultiLangText} from './text';


export type ConditionEnums = {
  afflictions: Array<EnumEntry>,
  elements: Array<EnumEntry>,
}


export type EnumEntry = {
  name: string,
  code: number,
  trans: MultiLangText
}
