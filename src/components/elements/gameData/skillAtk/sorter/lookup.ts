import {GetTranslationFunction} from '../../../../../i18n/types';
import {sortAscending, sortDescending} from '../../../../../utils/sort';
import {SortBy} from '../in/types';
import {CalculatedSkillEntry} from '../out/types';


// Unique dragon skills = 30 SP, Tobias S2 = 1 SP
const isSkillNotCommonSp = (entry: CalculatedSkillEntry) => entry.skillEntry.skill.spMax < 100;

type SortFuncLookup = { [sortBy in SortBy]: (entryA: CalculatedSkillEntry, entryB: CalculatedSkillEntry) => number }

export const sortFunc: SortFuncLookup = {
  mods: sortDescending({getComparer: (element) => element.skillDamage.totalMods}),
  damage: sortDescending({getComparer: (element) => element.skillDamage.expected}),
  sp: sortAscending({
    getComparer: (element) => element.skillEntry.skill.spMax,
    isToPutLast: isSkillNotCommonSp,
  }),
  ssp: sortAscending({
    getComparer: (element) => element.skillEntry.skill.ssSp,
    isToPutLast: (element) => !element.skillEntry.skill.sharable,
  }),
  modPer1KSp: sortDescending({
    getComparer: (element) => element.efficiency.modPctPer1KSp,
    isToPutLast: isSkillNotCommonSp,
  }),
  modPer1KSsp: sortDescending({
    getComparer: (element) => element.efficiency.modPctPer1KSsp,
    isToPutLast: (element) => !element.skillEntry.skill.sharable,
  }),
  afflictionLengthPer1KSp: sortDescending({
    getComparer: (element) => Math.min(...Object.values(element.efficiency.secPer1KSp)),
    isToPutLast: (element) => !element.skillEntry.skill.afflictions.length || isSkillNotCommonSp(element),
  }),
  afflictionLengthPer1KSsp: sortDescending({
    getComparer: (element) => Math.min(...Object.values(element.efficiency.secPer1KSsp)),
    isToPutLast: (element) => !element.skillEntry.skill.sharable || !element.skillEntry.skill.afflictions.length,
  }),
};

export const orderName: { [sortBy in SortBy]: GetTranslationFunction } = {
  mods: (t) => t.game.skillAtk.sort.mods,
  damage: (t) => t.game.skillAtk.sort.damage,
  sp: (t) => t.game.skillAtk.sort.sp,
  ssp: (t) => t.game.skillAtk.sort.ssp,
  modPer1KSp: (t) => t.game.skillAtk.spInfo.efficiency.modPctPer1KSp,
  modPer1KSsp: (t) => t.game.skillAtk.spInfo.efficiency.modPctPer1KSsp,
  afflictionLengthPer1KSp: (t) => t.game.skillAtk.spInfo.efficiency.secPer1KSp,
  afflictionLengthPer1KSsp: (t) => t.game.skillAtk.spInfo.efficiency.secPer1KSsp,
};
