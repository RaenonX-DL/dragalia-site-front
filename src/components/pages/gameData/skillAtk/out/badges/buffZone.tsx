import React from 'react';

import Badge from 'react-bootstrap/Badge';

import {AttackingSkillData} from '../../../../../../api-def/resources';
import {useI18n} from '../../../../../../i18n/hook';
import {OverlayTooltip} from '../../../../../elements/common/overlay/tooltip';


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
      <Badge bg="dark-primary">
        {t((t) => t.game.skillAtk.entry.buffZone)}
      </Badge>
    </OverlayTooltip>,
  ];
};
