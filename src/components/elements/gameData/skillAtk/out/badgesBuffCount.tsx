import React from 'react';

import {Badge} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';
import {AttackingSkillData} from '../../../../../utils/services/resources/types/skillAtk';
import {OverlayTooltip} from '../../../common/overlay/tooltip';

export const getBadgesBuffCount = (atkSkillEntry: AttackingSkillData) => {
  if (!atkSkillEntry.skill.buffCountBoost.some((data) => data.each > 0)) {
    return [];
  }

  const {t} = useTranslation();

  const maxEachPct = Math.max(...atkSkillEntry.skill.buffCountBoost.map((data) => data.each)) * 100;

  let tooltipText;
  if (atkSkillEntry.skill.buffCountBoost.some((data) => data.limit != 0)) {
    tooltipText = t(
      'game.skill_atk.entry.buff_count_desc_capped',
      {
        each: maxEachPct,
        limit: Math.max(...atkSkillEntry.skill.buffCountBoost.map((data) => data.limit)) * 100,
      },
    );
  } else {
    tooltipText = t('game.skill_atk.entry.buff_count_desc_uncapped', {each: maxEachPct});
  }

  return [
    <OverlayTooltip key="buffCount" text={tooltipText}>
      <Badge key="buffCount" variant="primary">{t('game.skill_atk.entry.buff_count')}</Badge>
    </OverlayTooltip>,
  ];
};
