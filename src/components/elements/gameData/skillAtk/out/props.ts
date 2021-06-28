import {AttackingSkillData, ConditionEnumMap, SkillEnums, SkillIdentifierInfo} from '../../../../../api-def/resources';


export type SectionProps = {
  atkSkillEntry: AttackingSkillData
}

export type EnumDataPack = {
  conditionEnumMap: ConditionEnumMap,
  skillIdentifierInfo: SkillIdentifierInfo,
  skillEnums: SkillEnums,
}
