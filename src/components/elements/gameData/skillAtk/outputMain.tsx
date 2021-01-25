import React from 'react';
import {calculateDamage, CalculateDamageReturn} from '../../../../utils/game';
import {
  AttackingSkillData,
  ConditionEnumMap,
  ElementBonusData,
  SkillIdentifierInfo,
} from '../../../../utils/services/resources/types';
import {overLengthWarningCheck} from '../utils';

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
  allConditionEnums: ConditionEnumMap,
  skillIdentifierInfo: SkillIdentifierInfo,
}


export const AttackingSkillOutput = (props: OutputProps) => {
  const {inputData, elementBonusData, atkSkillEntries, allConditionEnums, skillIdentifierInfo} = props;

  // Early termination on no input
  if (!inputData) {
    return <></>;
  }

  // Filter entries
  const atkSkillEntriesFiltered = filterSkillEntries(inputData, atkSkillEntries);

  // Calculate entries
  const calculatedEntries: Array<CalculatedData> = atkSkillEntriesFiltered
    .map((entry: AttackingSkillData) => {
      // Element bonus rate
      const charaElementRate = elementBonusData.getElementBonus(
        String(entry.chara.element),
        String(inputData.targetElemCondCode),
      );

      // Calculate skill damage
      const skillDamage = calculateDamage(inputData, entry, charaElementRate);
      // endregion

      return {skillDamage, skillEntry: entry};
    })
    .filter((calcData) => calcData.skillDamage.expected > 0)
    .sort((a, b) => b.skillDamage.expected - a.skillDamage.expected);

  const entries: Array<React.ReactElement> = [];

  // Check over-length
  const warning = overLengthWarningCheck(calculatedEntries);
  if (warning !== null) {
    entries.push(warning);
  }

  // Add transformed entries
  entries
    .push(
      ...calculatedEntries
        .map((calculatedData: CalculatedData, index: number) => (
          <AttackingSkillEntry
            key={index} inputData={inputData} calculatedData={calculatedData}
            conditionEnumMap={allConditionEnums} skillIdentifierInfo={skillIdentifierInfo}/>
        )),
    );

  return <>{entries}</>;
};
