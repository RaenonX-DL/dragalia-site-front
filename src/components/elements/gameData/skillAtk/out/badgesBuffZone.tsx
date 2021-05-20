import React from 'react';

import {Badge} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {AttackingSkillData} from '../../../../../utils/services/resources/types/skillAtk';
import {OverlayTooltip} from '../../../common/overlay/tooltip';

export const getBadgesBuffZone = (atkSkillEntry: AttackingSkillData) => {
  const {t} = useI18n();

  if (!atkSkillEntry.skill.buffZoneBoost.self && !atkSkillEntry.skill.buffZoneBoost.ally) {
    return [];
  }

  const tooltipText = t(
    (t) => t.game.skillAtk.entry.buffZoneDesc,
    {
      selfBoost: (atkSkillEntry.skill.buffZoneBoost.self * 100).toFixed(0),
      allyBoost: (atkSkillEntry.skill.buffZoneBoost.ally * 100).toFixed(0),
    },
  );

  return [
    <OverlayTooltip key="buffZone" text={tooltipText}>
      <Badge key="buffZone" variant="primary">
        {t((t) => t.game.skillAtk.entry.buffZone)}
      </Badge>
    </OverlayTooltip>,
  ];
};
