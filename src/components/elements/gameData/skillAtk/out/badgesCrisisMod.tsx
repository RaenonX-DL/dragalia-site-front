import React from 'react';

import {Badge} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';
import {AttackingSkillData} from '../../../../../utils/services/resources/types/skillAtk';
import {OverlayTooltip} from '../../../common/overlay/tooltip';

export const getBadgesCrisisMod = (atkSkillEntry: AttackingSkillData) => {
  let badges: Array<React.ReactNode> = [];

  const {t} = useTranslation();

  // > 1 crisis mod
  if (atkSkillEntry.skill.crisisMax.some((data) => data !== 0 && data > 1)) {
    const tooltipText = t(
      'game.skill_atk.entry.crisis_up_desc',
      {maxRate: Math.max(...atkSkillEntry.skill.crisisMax).toFixed(2)},
    );

    badges = badges.concat([
      <OverlayTooltip key="crisisUp" text={tooltipText}>
        <Badge variant="danger">{t('game.skill_atk.entry.crisis_up')}</Badge>
      </OverlayTooltip>,
    ]);
  }

  // < 1 crisis mod
  if (atkSkillEntry.skill.crisisMax.some((data) => data !== 0 && data < 1)) {
    const tooltipText = t(
      'game.skill_atk.entry.crisis_down_desc',
      {maxRate: Math.max(...atkSkillEntry.skill.crisisMax).toFixed(2)},
    );

    badges = badges.concat([
      <OverlayTooltip key="crisisDown" text={tooltipText}>
        <Badge key="crisisDown" variant="danger">{t('game.skill_atk.entry.crisis_down')}</Badge>
      </OverlayTooltip>,
    ]);
  }

  return badges;
};
