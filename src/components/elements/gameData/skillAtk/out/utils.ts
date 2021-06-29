import {AttackingSkillData, ElementBonusData} from '../../../../../api-def/resources';
import {calculateDamage} from '../../../../../utils/game/damage';
import {InputData} from '../in/types';
import {sortFunc} from './sorter/lookup';


export const filterSkillEntries = (inputData: InputData, atkSkillEntries: Array<AttackingSkillData>) => {
  // Filter shared skill only if set
  if (inputData.filter.sharedOnly) {
    atkSkillEntries = atkSkillEntries.filter((entry) => entry.skill.sharable);
  }

  // Filter dispel skill only if set
  if (inputData.filter.dispelOnly) {
    atkSkillEntries = atkSkillEntries.filter((entry) => entry.skill.dispelMax);
  }

  // Filter element if specified
  if (inputData.filter.elemCodes.length) {
    atkSkillEntries = atkSkillEntries
      .filter((entry) => inputData.filter.elemCodes.includes(entry.chara.element));
  }

  // Filter affliction condition if specified
  if (inputData.filter.afflictionCondCode.length) {
    atkSkillEntries = atkSkillEntries
      .filter((entry) => {
        const afflictionCodes = entry.skill.afflictions.map((afflictionUnit) => afflictionUnit.statusConditionCode);

        return inputData.filter.afflictionCondCode.some((afflictionCode) => afflictionCodes.includes(afflictionCode));
      });
  }

  return atkSkillEntries;
};


export const calculateEntries = (
  atkSkillEntries: Array<AttackingSkillData>, inputData: InputData, elemBonusData: ElementBonusData,
) => {
  return atkSkillEntries
    .map((entry: AttackingSkillData) => {
      // Element bonus rate
      const charaElementRate = elemBonusData.getElementBonus(
        String(entry.chara.element),
        String(inputData.target.elemCondCode),
      );

      // Calculate skill damage
      const skillDamage = calculateDamage(inputData, entry, charaElementRate);
      // endregion

      return {skillDamage, skillEntry: entry};
    })
    .filter((calcData) => calcData.skillDamage.expected > 0)
    .sort(sortFunc[inputData.sortBy]);
};
