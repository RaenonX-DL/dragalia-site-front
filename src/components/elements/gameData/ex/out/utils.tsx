import React from 'react';

import {Badge} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';
import {AbilityVariantEffectUnitData} from '../../../../../utils/services/resources/types/common/ability';
import {ConditionEnumMap} from '../../../../../utils/services/resources/types/enums';
import {ExAbilityDataEntry} from '../../../../../utils/services/resources/types/ex';
import {getConditionBadges} from '../../elements/conditionBadges';
import {InputData} from '../in/types';

export const getAbilityVariantEffectBadges = (
  entry: AbilityVariantEffectUnitData,
  conditionEnums: ConditionEnumMap,
  skipOccurrences: boolean = false,
): Array<React.ReactElement> => {
  const {t, lang} = useTranslation();

  const badges = getConditionBadges({
    conditionCodes: entry.conditions,
    conditionEnums: conditionEnums,
  });

  if (entry.cooldownSec !== 0) {
    badges.push(
      <Badge variant="info">
        {t('game.ex.badge.info_cooldown', {cooldownSec: entry.cooldownSec})}
      </Badge>,
    );
  }
  if (entry.durationCount !== 0) {
    badges.push(
      <Badge variant="info">
        {t('game.ex.badge.info_duration_count', {durationCount: entry.durationCount})}
      </Badge>,
    );
  }
  if (entry.durationSec !== 0) {
    badges.push(
      <Badge variant="info">
        {t('game.ex.badge.info_duration_sec', {durationSec: entry.durationSec})}
      </Badge>,
    );
  }
  if (!skipOccurrences && entry.maxOccurrences !== 0) {
    badges.push(
      <Badge variant="info">
        {t('game.ex.badge.info_max_occurrences', {maxOccurrences: entry.maxOccurrences})}
      </Badge>,
    );
  }
  if (entry.maxStackCount !== 0) {
    badges.push(
      <Badge variant="info">
        {t('game.ex.badge.info_max_stack_count', {maxStackCount: entry.maxStackCount})}
      </Badge>,
    );
  }
  if (entry.probabilityPct !== 0 && entry.probabilityPct !== 100) {
    badges.push(
      <Badge variant="info">
        {t('game.ex.badge.info_probability_pct', {probabilityPct: entry.probabilityPct})}
      </Badge>,
    );
  }
  if (entry.targetAction[lang]) {
    badges.push(
      <Badge variant="info">
        {t('game.ex.badge.info_target_action', {targetAction: entry.targetAction[lang]})}
      </Badge>,
    );
  }

  return badges;
};

export const filterExAbilityData = (exAbilityData: Array<ExAbilityDataEntry>, inputData: InputData) => {
  return exAbilityData.filter((entry) => {
    if (inputData.filterElementCode.length > 0 && !inputData.filterElementCode.includes(entry.chara.element)) {
      return false;
    }

    if (
      inputData.filterExBuffParamCode.length > 0 &&
      !entry.ex.some((exEffect) => {
        return inputData.filterExBuffParamCode.includes(exEffect.parameter.code);
      })
    ) {
      return false;
    }

    return inputData.filterChainedExBuffParamCode.length == 0 ||
      entry.chainedEx.some((chainedExEffect) => {
        return inputData.filterChainedExBuffParamCode.includes(chainedExEffect.parameter.code);
      });
  });
};
