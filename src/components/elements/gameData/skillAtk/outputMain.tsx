import React from 'react';
import {calculateDamage, CalculateDamageReturn} from '../../../../utils/game';
import {AttackingSkillData, ElementBonusData} from '../../../../utils/services/resources/types';

import {InputData} from './inputSection';
import {AttackingSkillEntry} from './outputEntry';


export type CalculatedData = {
  skillDamage: CalculateDamageReturn,
  skillEntry: AttackingSkillData,
}


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
