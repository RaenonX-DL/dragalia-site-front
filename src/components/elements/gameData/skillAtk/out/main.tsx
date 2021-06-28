import React from 'react';

import {AttackingSkillData, ElementBonusData} from '../../../../../api-def/resources';
import {calculateDamage, CalculateDamageReturn} from '../../../../../utils/game/damage';
import {AnimationInfoWarning} from '../../warnings/animation';
import {overLengthWarningCheck} from '../../warnings/overLength';
import {InputData} from '../in/types';
import {AttackingSkillEntry} from './entry';
import {EnumDataPack} from './props';
import {filterSkillEntries} from './utils';


export type CalculatedData = {
  skillDamage: CalculateDamageReturn,
  skillEntry: AttackingSkillData,
}

type OutputProps = EnumDataPack & {
  inputData?: InputData,
  elementBonusData: ElementBonusData,
  atkSkillEntries: Array<AttackingSkillData>,
}

export const AttackingSkillOutput = ({
  inputData,
  elementBonusData,
  atkSkillEntries,
  conditionEnumMap,
  skillIdentifierInfo,
  skillEnums,
}: OutputProps) => {
  // Early termination if no input
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
        String(inputData.target.elemCondCode),
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
  // Check if animation info warning should be displayed
  if (inputData.display.animationInfo) {
    entries.push(<AnimationInfoWarning/>);
  }

  // Add transformed entries
  entries.push(
    ...calculatedEntries
      .map((calculatedData: CalculatedData, index: number) => (
        <AttackingSkillEntry
          key={index}
          inputData={inputData}
          calculatedData={calculatedData}
          conditionEnumMap={conditionEnumMap}
          skillIdentifierInfo={skillIdentifierInfo}
          skillEnums={skillEnums}
        />
      )),
  );

  return <>{entries}</>;
};
