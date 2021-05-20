import React from 'react';

import {Badge} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {AttackingSkillData} from '../../../../../utils/services/resources/types/skillAtk';
import {OverlayTooltip} from '../../../common/overlay/tooltip';

export const getBadgesBuffCount = (atkSkillEntry: AttackingSkillData) => {
  const {t} = useI18n();

  if (!atkSkillEntry.skill.buffCountBoost.some((data) => data.each > 0)) {
    return [];
  }

  const maxEachPct = Math.max(...atkSkillEntry.skill.buffCountBoost.map((data) => data.each)) * 100;

  let tooltipText;
  if (atkSkillEntry.skill.buffCountBoost.some((data) => data.limit != 0)) {
    tooltipText = t(
      (t) => t.game.skillAtk.entry.buffCountDescCapped,
      {
        each: maxEachPct.toFixed(0),
        limit: (Math.max(...atkSkillEntry.skill.buffCountBoost.map((data) => data.limit)) * 100).toFixed(0),
      },
    );
  } else {
    tooltipText = t((t) => t.game.skillAtk.entry.buffCountDescUncapped, {each: maxEachPct.toFixed(0)});
  }

  return [
    <OverlayTooltip key="buffCount" text={tooltipText}>
      <Badge key="buffCount" variant="primary">{t((t) => t.game.skillAtk.entry.buffCount)}</Badge>
    </OverlayTooltip>,
  ];
};
