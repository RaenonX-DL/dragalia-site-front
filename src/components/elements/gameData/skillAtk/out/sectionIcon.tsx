import React from 'react';

import {useI18n} from '../../../../../i18n/hook';
import {DepotPaths} from '../../../../../utils/services/resources/paths';
import {OverlayTooltip} from '../../../common/overlay/tooltip';
import {SectionProps} from './props';

export const SectionImageIcon = ({atkSkillEntry}: SectionProps) => {
  const {lang} = useI18n();

  const charaName = atkSkillEntry.chara.name[lang];
  const charaIconURL = DepotPaths.getCharaIconURL(atkSkillEntry.chara.iconName);

  return (
    <OverlayTooltip text={charaName}>
      <img src={charaIconURL} alt={charaName} style={{height: '4rem'}}/>
    </OverlayTooltip>
  );
};
