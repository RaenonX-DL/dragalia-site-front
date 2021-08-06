import React from 'react';

import {DepotPaths} from '../../../../../../api-def/resources';
import {useI18n} from '../../../../../../i18n/hook';
import {ImageWithOverlay} from '../../../../../elements/common/image';
import {SectionProps} from '../props';


export const SectionImageIcon = ({atkSkillEntry}: SectionProps) => {
  const {lang} = useI18n();

  const charaName = atkSkillEntry.unit.name[lang];
  const charaIconURL = DepotPaths.getUnitIconURL(atkSkillEntry.unit.type, atkSkillEntry.unit.iconName);

  return (
    <ImageWithOverlay
      src={charaIconURL}
      text={charaName}
      style={{height: '4rem'}}
    />
  );
};
