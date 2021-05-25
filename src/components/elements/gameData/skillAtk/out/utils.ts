import {AttackingSkillData} from '../../../../../api-def/resources';
import {InputData} from '../in/types';


export const filterSkillEntries = (inputData: InputData, atkSkillEntries: Array<AttackingSkillData>) => {
  // Filter shared skill only if set
  if (inputData.filterSharedOnly) {
    atkSkillEntries = atkSkillEntries.filter((entry) => entry.skill.sharable);
  }

  // Filter element if specified
  if (inputData.filterElementCode.length > 0) {
    atkSkillEntries = atkSkillEntries
      .filter((entry) => inputData.filterElementCode.includes(entry.chara.element));
  }

  // Filter affliction condition if specified
  if (inputData.filterAfflictionCondCode.length > 0) {
    atkSkillEntries = atkSkillEntries
      .filter((entry) => {
        const afflictionCodes = entry.skill.afflictions.map((afflictionUnit) => afflictionUnit.statusConditionCode);

        return inputData.filterAfflictionCondCode.some((afflictionCode) => afflictionCodes.includes(afflictionCode));
      });
  }

  return atkSkillEntries;
};
