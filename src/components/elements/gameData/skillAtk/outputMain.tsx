import React from 'react';
import {calculateDamage, CalculateDamageReturn} from '../../../../utils/game';
import {AttackingSkillData, ElementBonusData} from '../../../../utils/services/resources/types';

import {InputData} from './inputSection';
import {AttackingSkillEntry} from './outputEntry';


export type CalculatedData = {
  skillDamage: CalculateDamageReturn,
  skillEntry: AttackingSkillData,
}


export const filterSkillEntries = (inputData: InputData, atkSkillEntries: Array<AttackingSkillData>) => {
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


type OutputProps = {
  inputData?: InputData,
  elementBonusData: ElementBonusData,
  atkSkillEntries: Array<AttackingSkillData>,
}


export const AttackingSkillOutput = ({inputData, elementBonusData, atkSkillEntries}: OutputProps) => {
  // Early termination on no input
  if (!inputData) {
    return <></>;
  }

  // Filter entries
  atkSkillEntries = filterSkillEntries(inputData, atkSkillEntries);

  // Calculate entries
  const calculatedEntries: Array<CalculatedData> = atkSkillEntries.map((entry: AttackingSkillData) => {
    // Element bonus rate
    const charaElementRate = elementBonusData.getElementBonus(
      String(entry.chara.element),
      String(inputData.targetElemCondCode),
    );

    // Calculate skill damage
    const skillDamage = calculateDamage(inputData, entry.skill.totalModsMax, charaElementRate);
    // endregion

    return {skillDamage, skillEntry: entry};
  });

  return (
    <>
      {
        calculatedEntries
          .filter((calcData) => calcData.skillDamage.expected > 0)
          .sort((a, b) => b.skillDamage.expected - a.skillDamage.expected)
          .map((calculatedData: CalculatedData, index: number) => (
            <AttackingSkillEntry inputData={inputData} calculatedData={calculatedData} key={index}/>
          ))
      }
    </>
  );
};
