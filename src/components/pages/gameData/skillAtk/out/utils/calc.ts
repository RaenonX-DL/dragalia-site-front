import {AttackingSkillData} from '../../../../../../api-def/resources';
import {Efficiency} from '../types';


export const calculateEfficiency = (totalSkillMods: number, entry: AttackingSkillData): Efficiency => ({
  modPctPer1KSp: (totalSkillMods * 100) / (entry.skill.spMax / 1000),
  modPctPer1KSsp: (totalSkillMods * 100) / (entry.skill.ssSp / 1000),
  secPer1KSp: Object.fromEntries(entry.skill.afflictions.map((afflictionUnit) => (
    [afflictionUnit.statusCode, afflictionUnit.duration / (entry.skill.spMax / 1000)]
  ))),
  secPer1KSsp: Object.fromEntries(entry.skill.afflictions.map((afflictionUnit) => (
    [afflictionUnit.statusCode, afflictionUnit.duration / (entry.skill.ssSp / 1000)]
  ))),
  spFullFillSec: entry.skill.spGradualPctMax ? 100 / entry.skill.spGradualPctMax : 0,
});
