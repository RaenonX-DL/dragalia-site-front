import {AttackingSkillData, ElementBonusData} from '../../../../../../api-def/resources';
import {calculateDamage} from '../../../../../../utils/game/damage';
import {InputData} from '../../in/types';
import {sortFunc} from '../../sorter/lookup';
import {CalculatedSkillEntry, Efficiency} from '../types';
import {calculateEfficiency} from './calc';


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
      .filter((entry) => inputData.filter.elemCodes.includes(entry.unit.element));
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
): Array<CalculatedSkillEntry> => {
  return atkSkillEntries
    .map((skillEntry: AttackingSkillData) => {
      // Element bonus rate
      const charaElementRate = elemBonusData.getElementBonus(
        String(skillEntry.unit.element),
        String(inputData.target.elemCondCode),
      );

      // Calculate skill damage
      const skillDamage = calculateDamage(inputData, skillEntry, charaElementRate);

      // Calculate efficiency
      const efficiency: Efficiency = inputData.display.spInfo ?
        calculateEfficiency(skillDamage.totalMods, skillEntry) :
        {
          modPctPer1KSp: 0,
          modPctPer1KSsp: 0,
          secPer1KSp: {},
          secPer1KSsp: {},
          spFullFillSec: 0,
        };

      return {skillDamage, skillEntry, efficiency};
    })
    .filter((calcData) => calcData.skillDamage.totalMods > 0)
    .sort(sortFunc[inputData.sortBy]);
};
