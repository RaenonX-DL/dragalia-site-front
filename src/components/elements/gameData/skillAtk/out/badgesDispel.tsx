import React from 'react';

import {Badge} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';
import {AttackingSkillData} from '../../../../../utils/services/resources/types/skillAtk';
import {OverlayTooltip} from '../../../common/overlay/tooltip';

export const getBadgesDispel = (atkSkillEntry: AttackingSkillData) => {
  if (!atkSkillEntry.skill.dispelMax) {
    return [];
  }

  const {t} = useTranslation();

  const tooltipText = t(
    'game.skill_atk.entry.dispel_desc',
    {dispelTiming: atkSkillEntry.skill.dispelTimingMax[0].toFixed(2)},
  );

  return [
    <OverlayTooltip key="dispel" text={tooltipText}>
      <Badge key="dispel" variant="orange">{t('game.skill_atk.entry.dispel')}</Badge>
    </OverlayTooltip>,
  ];
};
