import React from 'react';

import {AfflictionWarning} from '../../../../elements/gameData/warnings/affliction';
import {AnimationInfoWarning} from '../../../../elements/gameData/warnings/animation';
import {NoResultWarning} from '../../../../elements/gameData/warnings/noResult';
import {overLengthWarningCheck} from '../../../../elements/gameData/warnings/overLength';
import {InputData} from '../in/types';
import {AttackingSkillEntry} from './entry';
import {EnumDataPack} from './props';
import {CalculatedSkillEntry} from './types';


type OutputProps = EnumDataPack & {
  displayConfig: InputData['display'],
  calculatedEntries: Array<CalculatedSkillEntry>,
}

export const AttackingSkillOutput = ({displayConfig, calculatedEntries, ...enums}: OutputProps) => {
  if (!calculatedEntries.length) {
    return <NoResultWarning/>;
  }

  const entries: Array<React.ReactElement> = [];

  // Check over-length
  const warning = overLengthWarningCheck(calculatedEntries);
  if (warning !== null) {
    entries.push(warning);
  }
  // Check if animation info alert should be displayed
  if (displayConfig.animationInfo) {
    entries.push(<AnimationInfoWarning key="animationWarning"/>);
  }
  // Check if affliction info alert should be displayed
  // - Both affliction and SP info do something with affliction
  if (displayConfig.affliction || displayConfig.spInfo) {
    entries.push(<AfflictionWarning key="afflictionWarning"/>);
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
