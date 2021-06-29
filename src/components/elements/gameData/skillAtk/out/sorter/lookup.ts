import {GetTranslationFunction} from '../../../../../../i18n/types';
import {SortBy} from '../../in/types';
import {CalculatedSkillEntry} from '../types';


type SortFuncLookup = { [sortBy in SortBy]: (entryA: CalculatedSkillEntry, entryB: CalculatedSkillEntry) => number }

export const sortFunc: SortFuncLookup = {
  damage: (a, b) => b.skillDamage.expected - a.skillDamage.expected,
  sp: (a, b) => a.skillEntry.skill.spMax - b.skillEntry.skill.spMax,
  ssp: (a, b) => a.skillEntry.skill.ssSp - b.skillEntry.skill.ssSp,
  spPer1KMod: (a, b) => b.efficiency.spPer1KMod - a.efficiency.spPer1KMod,
  sspPer1KMod: (a, b) => b.efficiency.sspPer1KMod - a.efficiency.sspPer1KMod,
  afflictionLengthPer1KSp: (a, b) => (
    Math.min(...Object.values(b.efficiency.secPer1KSp)) - Math.min(...Object.values(a.efficiency.secPer1KSp))
  ),
  afflictionLengthPer1KSsp: (a, b) => (
    Math.min(...Object.values(b.efficiency.secPer1KSsp)) - Math.min(...Object.values(a.efficiency.secPer1KSsp))
  ),
};

export const orderName: { [sortBy in SortBy]: GetTranslationFunction } = {
  damage: (t) => t.game.skillAtk.sort.damageDesc,
  sp: (t) => t.game.skillAtk.sort.sp,
  ssp: (t) => t.game.skillAtk.sort.ssp,
  spPer1KMod: (t) => t.game.skillAtk.spInfo.efficiency.spPer1KMod,
  sspPer1KMod: (t) => t.game.skillAtk.spInfo.efficiency.sspPer1KMod,
  afflictionLengthPer1KSp: (t) => t.game.skillAtk.spInfo.efficiency.secPer1KSp,
  afflictionLengthPer1KSsp: (t) => t.game.skillAtk.spInfo.efficiency.secPer1KSsp,
};
