import {MultiLangText} from './common/text';

export type EnumEntry = {
  name: string,
  code: number,
  imagePath: string | null,
  trans: MultiLangText
}

export type ConditionEnumEntry = EnumEntry & {
  colorTheme: string
}
