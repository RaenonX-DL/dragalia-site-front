import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {SkillIdentifierInfo} from '../../../../../utils/services/resources/types/skill';
import {SectionProps} from './props';

type SectionSkillNameProps = SectionProps & {
  skillIdentifierInfo: SkillIdentifierInfo,
}

export const SectionSkillName = ({atkSkillEntry, skillIdentifierInfo}: SectionSkillNameProps) => {
  const {lang} = useI18n();

  return (
    <>
      <span className="h5">
        {
          atkSkillEntry.skill.identifiers
            .map((identifier) => skillIdentifierInfo[identifier].trans[lang])
            .join(' / ')
        }
      </span>
      <br/>
      <small>{atkSkillEntry.skill.name[lang]}</small>
    </>
  );
};
