import React from 'react';

import {SectionProps} from '../props';
import {CalculatedSkillEntry} from '../types';


type SectionSkillInfoProps = SectionProps & {
  calculatedData: CalculatedSkillEntry,
};

export const SectionSkillInfo = ({atkSkillEntry, calculatedData}: SectionSkillInfoProps) => (
  <>
    <span className="h5">{`${(calculatedData.skillDamage.totalMods * 100).toFixed(0)}%`}</span>
    &nbsp;
    <small>{atkSkillEntry.skill.hitsMax}&nbsp;HIT</small>
  </>
);
