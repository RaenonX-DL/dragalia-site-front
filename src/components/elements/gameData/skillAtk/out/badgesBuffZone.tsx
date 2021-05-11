import React from 'react';

import {Badge} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';
import {AttackingSkillData} from '../../../../../utils/services/resources/types/skillAtk';
import {OverlayTooltip} from '../../../common/overlay/tooltip';

export const getBadgesBuffZone = (atkSkillEntry: AttackingSkillData) => {
  if (!atkSkillEntry.skill.buffZoneBoost.self && !atkSkillEntry.skill.buffZoneBoost.ally) {
    return [];
  }

  const {t} = useTranslation();

  const tooltipText = t(
    'game.skill_atk.entry.buff_zone_desc',
    {
      selfBoost: atkSkillEntry.skill.buffZoneBoost.self * 100,
      allyBoost: atkSkillEntry.skill.buffZoneBoost.ally * 100,
    },
  );

  return [
    <OverlayTooltip key="buffZone" text={tooltipText}>
      <Badge key="buffZone" variant="primary">{t('game.skill_atk.entry.buff_zone')}</Badge>
    </OverlayTooltip>,
  ];
};
