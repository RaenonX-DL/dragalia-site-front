import React from 'react';

import {Badge} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {AttackingSkillData} from '../../../../../utils/services/resources/types';
import {OverlayTooltip} from '../../../common/overlay/tooltip';

export const getBadgesCrisisMod = (atkSkillEntry: AttackingSkillData) => {
  let badges: Array<React.ReactElement> = [];

  const {t} = useI18n();

  // > 1 crisis mod
  if (atkSkillEntry.skill.crisisMax.some((data) => data !== 0 && data > 1)) {
    const tooltipText = t(
      (t) => t.game.skillAtk.entry.crisisUpDesc,
      {maxRate: Math.max(...atkSkillEntry.skill.crisisMax).toFixed(2)},
    );

    badges = badges.concat([
      <OverlayTooltip key="crisisUp" text={tooltipText}>
        <Badge variant="danger">{t((t) => t.game.skillAtk.entry.crisisUp)}</Badge>
      </OverlayTooltip>,
    ]);
  }

  // < 1 crisis mod
  if (atkSkillEntry.skill.crisisMax.some((data) => data !== 0 && data < 1)) {
    const tooltipText = t(
      (t) => t.game.skillAtk.entry.crisisDownDesc,
      {maxRate: Math.max(...atkSkillEntry.skill.crisisMax).toFixed(2)},
    );

    badges = badges.concat([
      <OverlayTooltip key="crisisDown" text={tooltipText}>
        <Badge key="crisisDown" variant="danger">{t((t) => t.game.skillAtk.entry.crisisDown)}</Badge>
      </OverlayTooltip>,
    ]);
  }

  return badges;
};
