import React from 'react';

import {CalculatedData} from '../main';
import {SectionProps} from '../props';


type SectionSkillInfoProps = SectionProps & {
  calculatedData: CalculatedData,
}

export const SectionSkillInfo = ({atkSkillEntry, calculatedData}: SectionSkillInfoProps) => (
  <>
    <span className="h5">{`${(calculatedData.skillDamage.totalMods * 100).toFixed(0)}%`}</span>
    <br/>
    <small>{atkSkillEntry.skill.hitsMax}&nbsp;HIT</small>
  </>
);
