import {AttackingSkillData} from '../../../../../api-def/resources';
import {CalculateDamageReturn} from '../../../../../utils/game/damage';


export type Efficiency = {
  modPctPer1KSp: number,
  modPctPer1KSsp: number,
  secPer1KSp: {[StatusCode in number]: number},
  secPer1KSsp: {[StatusCode in number]: number},
  spFullFillSec: number,
}

export type CalculatedSkillEntry = {
  skillDamage: CalculateDamageReturn,
  skillEntry: AttackingSkillData,
  efficiency: Efficiency,
}
