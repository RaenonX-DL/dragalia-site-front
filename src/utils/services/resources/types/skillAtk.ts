import {MultiLangText} from './text';


export type AfflictionUnit = {
  statusConditionCode: number,
  statusIcon: string,
  actionTime: number,
  probabilityPct: number,
  duration: number,
  stackable: boolean
}


export type BuffCountBoost = {
  each: number,
  inEffect: number,
  limit: number,
}


export type BuffZoneBoost = {
  self: number,
  ally: number,
}


export type AttackingSkillData = {
  uniqueHash: string,
  condition: Array<number>,
  chara: {
    iconName: string,
    name: MultiLangText,
    element: number,
  },
  skill: {
    identifiers: Array<string>,
    internalId: number,
    name: MultiLangText,
    spMax: number,
    sharable: boolean,
    ssCost: number,
    ssSp: number,
    modsMax: Array<number>,
    crisisMax: Array<number>,
    hitsMax: number,
    afflictions: Array<AfflictionUnit>,
    buffCountBoost: Array<BuffCountBoost>,
    buffZoneBoost: BuffZoneBoost,
    dispelMax: boolean,
    dispelTimingMax: Array<number>,
  }
}
