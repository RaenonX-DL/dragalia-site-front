import {AttackingSkillData} from '../../../../../api-def/resources';
import {CalculateDamageReturn} from '../../../../../utils/game/damage';


export type Efficiency = {
  spPer1KMod: number,
  sspPer1KMod: number,
  secPer1KSp: {[StatusCode in number]: number},
  secPer1KSsp: {[StatusCode in number]: number},
}

export type CalculatedSkillEntry = {
  skillDamage: CalculateDamageReturn,
  skillEntry: AttackingSkillData,
  efficiency: Efficiency,
}
