import {AttackingSkillData} from '../../../../../api-def/resources';
import {InputData} from '../in/types';


export const filterSkillEntries = (inputData: InputData, atkSkillEntries: Array<AttackingSkillData>) => {
  // Filter shared skill only if set
  if (inputData.filter.sharedOnly) {
    atkSkillEntries = atkSkillEntries.filter((entry) => entry.skill.sharable);
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
