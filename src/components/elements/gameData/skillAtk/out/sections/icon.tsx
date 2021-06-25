import React from 'react';

import {DepotPaths} from '../../../../../../api-def/resources';
import {useI18n} from '../../../../../../i18n/hook';
import {ImageWithOverlay} from '../../../../common/image';
import {SectionProps} from '../props';


export const SectionImageIcon = ({atkSkillEntry}: SectionProps) => {
  const {lang} = useI18n();

  const charaName = atkSkillEntry.chara.name[lang];
  const charaIconURL = DepotPaths.getCharaIconURL(atkSkillEntry.chara.iconName);

  return (
    <ImageWithOverlay
      src={charaIconURL}
      text={charaName}
      style={{height: '4rem'}}
    />
  );
};
