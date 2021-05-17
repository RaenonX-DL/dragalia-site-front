import React from 'react';

import {Badge} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {AttackingSkillData} from '../../../../../utils/services/resources/types/skillAtk';
import {OverlayTooltip} from '../../../common/overlay/tooltip';

export const getBadgesDispel = (atkSkillEntry: AttackingSkillData) => {
  if (!atkSkillEntry.skill.dispelMax) {
    return [];
  }

  const {t} = useI18n();

  const tooltipText = t(
    (t) => t.game.skillAtk.entry.dispelDesc,
    {dispelTiming: atkSkillEntry.skill.dispelTimingMax[0].toFixed(2)},
  );

  return [
    <OverlayTooltip key="dispel" text={tooltipText}>
      <Badge key="dispel" variant="orange">{t((t) => t.game.skillAtk.entry.dispel)}</Badge>
    </OverlayTooltip>,
  ];
};
