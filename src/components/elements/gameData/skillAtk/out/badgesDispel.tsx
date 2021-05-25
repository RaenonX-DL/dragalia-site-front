import React from 'react';

import {Badge} from 'react-bootstrap';

import {AttackingSkillData} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {OverlayTooltip} from '../../../common/overlay/tooltip';

export const getBadgesDispel = (atkSkillEntry: AttackingSkillData) => {
  const {t} = useI18n();

  if (!atkSkillEntry.skill.dispelMax) {
    return [];
  }

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
