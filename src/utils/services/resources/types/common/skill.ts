import {CharaData} from './chara';
import {MultiLangText} from './text';

export type SkillDataBase = {
  identifiers: Array<string>,
  internalId: number,
  name: MultiLangText,
  spMax: number,
  sharable: boolean,
  ssCost: number,
  ssSp: number
}

export type SkillEntryBase = {
  uniqueHash: string,
  condition: Array<number>,
  chara: CharaData,
  skill: SkillDataBase
}
