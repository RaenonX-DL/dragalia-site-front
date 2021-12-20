import React from 'react';

import {SkillIdentifierInfo} from '../../../../../../api-def/resources';
import {useI18n} from '../../../../../../i18n/hook';
import {UnitLink} from '../../../../../elements/gameData/unit/link';
import {SectionProps} from '../props';


type SectionSkillNameProps = SectionProps & {
  skillIdentifierInfo: SkillIdentifierInfo,
};

export const SectionSkillName = ({atkSkillEntry, skillIdentifierInfo}: SectionSkillNameProps) => {
  const {lang} = useI18n();

  return (
    <>
      <div className="h5 mb-1">
        <UnitLink unit={{id: atkSkillEntry.unit.id, name: atkSkillEntry.unit.name[lang]}}/>
      </div>
      <div className="text-white-50">
        {
          atkSkillEntry.skill.identifiers
            .map((identifier) => skillIdentifierInfo[identifier].trans[lang])
            .join(' / ')
        }
      </div>
    </>
  );
};
