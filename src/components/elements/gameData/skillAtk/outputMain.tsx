import React from 'react';
import {Alert} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {PAGE_ATK_SKILL_MAX_ENTRIES} from '../../../../constants/config';
import {calculateDamage, CalculateDamageReturn} from '../../../../utils/game';
import {
  AllConditionEnums,
  AttackingSkillData,
  ElementBonusData,
  SkillIdentifierInfo,
} from '../../../../utils/services/resources/types';

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
  allConditionEnums: AllConditionEnums,
  skillIdentifierInfo: SkillIdentifierInfo,
}


type TruncatedEntryProps = {
  displayed: number,
  returned: number,
}


const TruncatedWarningEntry = ({displayed, returned}: TruncatedEntryProps) => {
  const {t} = useTranslation();

  return (
    <Alert variant="warning" className="rounded bg-black-32 p-2 mb-2">
      {t('message.warning.truncated', {displayed, returned})}
    </Alert>
  );
};


export const AttackingSkillOutput = (props: OutputProps) => {
  const {inputData, elementBonusData, atkSkillEntries, allConditionEnums, skillIdentifierInfo} = props;

  // Early termination on no input
  if (!inputData) {
    return <></>;
  }

  // Filter entries
  const atkSkillEntriesFiltered = filterSkillEntries(inputData, atkSkillEntries);

  // Calculate entries
  let calculatedEntries: Array<CalculatedData> = atkSkillEntriesFiltered
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
  if (calculatedEntries.length > PAGE_ATK_SKILL_MAX_ENTRIES) {
    entries.push(
      <TruncatedWarningEntry displayed={PAGE_ATK_SKILL_MAX_ENTRIES} returned={calculatedEntries.length} key={-1}/>,
    );
    calculatedEntries = calculatedEntries.slice(0, PAGE_ATK_SKILL_MAX_ENTRIES);
  }

  // Add transformed entries
  entries
    .push(
      ...calculatedEntries
        .map((calculatedData: CalculatedData, index: number) => (
          <AttackingSkillEntry
            key={index} inputData={inputData} calculatedData={calculatedData}
            allConditionEnums={allConditionEnums} skillIdentifierInfo={skillIdentifierInfo}/>
        )),
    );

  return <>{entries}</>;
};
