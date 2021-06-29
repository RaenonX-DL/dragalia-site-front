import React from 'react';

import {AttackingSkillData} from '../../../../../api-def/resources';
import {AnimationInfoWarning} from '../../warnings/animation';
import {overLengthWarningCheck} from '../../warnings/overLength';
import {InputData} from '../in/types';
import {AttackingSkillEntry} from './entry';
import {EnumDataPack} from './props';
import {CalculatedSkillEntry} from './types';


type OutputProps = EnumDataPack & {
  displayConfig: InputData['display'],
  atkSkillEntries: Array<AttackingSkillData>,
  calculatedEntries: Array<CalculatedSkillEntry>,
}

export const AttackingSkillOutput = ({displayConfig, atkSkillEntries, calculatedEntries, ...enums}: OutputProps) => {
  // Early termination if no input
  if (!calculatedEntries.length) {
    return <></>;
  }

  const entries: Array<React.ReactElement> = [];

  // Check over-length
  const warning = overLengthWarningCheck(calculatedEntries);
  if (warning !== null) {
    entries.push(warning);
  }
  // Check if animation info warning should be displayed
  if (displayConfig.animationInfo) {
    entries.push(<AnimationInfoWarning/>);
  }

  // Add transformed entries
  entries.push(
    ...calculatedEntries
      .map((calculatedData: CalculatedSkillEntry, index: number) => (
        <AttackingSkillEntry
          key={index}
          displayConfig={displayConfig}
          calculatedData={calculatedData}
          {...enums}
        />
      )),
  );

  return <>{entries}</>;
};
