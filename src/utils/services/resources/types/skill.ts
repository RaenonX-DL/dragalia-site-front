import {MultiLangText} from './text';


export type SkillIdentifierEntry = {
  name: string,
  trans: MultiLangText,
}


export type SkillIdentifierInfo = Record<string, SkillIdentifierEntry>
