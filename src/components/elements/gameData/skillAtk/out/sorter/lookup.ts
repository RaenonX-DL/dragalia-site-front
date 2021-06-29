import {GetTranslationFunction} from '../../../../../../i18n/types';
import {SortBy} from '../../in/types';
import {CalculatedSkillEntry} from '../types';


type SortFuncLookup = { [sortBy in SortBy]: (entryA: CalculatedSkillEntry, entryB: CalculatedSkillEntry) => number }

export const sortFunc: SortFuncLookup = {
  damageDesc: (a, b) => b.skillDamage.expected - a.skillDamage.expected,
  spAsc: (a, b) => a.skillEntry.skill.spMax - b.skillEntry.skill.spMax,
  sspAsc: (a, b) => a.skillEntry.skill.ssSp - b.skillEntry.skill.ssSp,
  spPer1KModDesc: (a, b) => b.efficiency.spPer1KMod - a.efficiency.spPer1KMod,
  sspPer1KModDesc: (a, b) => b.efficiency.sspPer1KMod - a.efficiency.sspPer1KMod,
  afflictionLengthPer1KSpDesc: (a, b) => (
    Math.min(...Object.values(b.efficiency.secPer1KSp)) - Math.min(...Object.values(a.efficiency.secPer1KSp))
  ),
  afflictionLengthPer1KSspDesc: (a, b) => (
    Math.min(...Object.values(b.efficiency.secPer1KSsp)) - Math.min(...Object.values(a.efficiency.secPer1KSsp))
  ),
};

export const orderName: { [sortBy in SortBy]: GetTranslationFunction } = {
  damageDesc: (t) => t.game.skillAtk.sort.damageDesc,
  spAsc: (t) => t.game.skillAtk.sort.spAsc,
  sspAsc: (t) => t.game.skillAtk.sort.sspAsc,
  spPer1KModDesc: (t) => t.game.skillAtk.sort.spPer1KModDesc,
  sspPer1KModDesc: (t) => t.game.skillAtk.sort.sspPer1KModDesc,
  afflictionLengthPer1KSpDesc: (t) => t.game.skillAtk.sort.afflictionLengthPer1KSpDesc,
  afflictionLengthPer1KSspDesc: (t) => t.game.skillAtk.sort.afflictionLengthPer1KSspDesc,
};
