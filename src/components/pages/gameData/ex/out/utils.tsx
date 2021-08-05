import React from 'react';

import Badge from 'react-bootstrap/Badge';

import {
  AbilityVariantEffectUnitData,
  CharaExAbilityDataEntry,
  ConditionEnumMap,
} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {getConditionBadges} from '../../../../elements/gameData/conditionBadges';
import {InputData} from '../in/types';


export const getAbilityVariantEffectBadges = (
  entry: AbilityVariantEffectUnitData,
  conditionEnums: ConditionEnumMap,
  skipOccurrences: boolean = false,
): Array<React.ReactElement> => {
  const {t, lang} = useI18n();

  const badges = getConditionBadges({conditionCodes: entry.conditions});

  if (entry.cooldownSec !== 0) {
    badges.push(
      <Badge variant="info">
        {t(
          (t) => t.game.ex.badge.infoCooldown,
          {cooldownSec: entry.cooldownSec.toFixed(0)},
        )}
      </Badge>,
    );
  }
  if (entry.durationCount !== 0) {
    badges.push(
      <Badge variant="info">
        {t(
          (t) => t.game.ex.badge.infoDurationCount,
          {durationCount: entry.durationCount.toFixed(0)},
        )}
      </Badge>,
    );
  }
  if (entry.durationSec !== 0) {
    badges.push(
      <Badge variant="info">
        {t(
          (t) => t.game.ex.badge.infoDurationSec,
          {durationSec: entry.durationSec.toFixed(0)},
        )}
      </Badge>,
    );
  }
  if (!skipOccurrences && entry.maxOccurrences !== 0) {
    badges.push(
      <Badge variant="info">
        {t(
          (t) => t.game.ex.badge.infoMaxOccurrences,
          {maxOccurrences: entry.maxOccurrences.toFixed(0)},
        )}
      </Badge>,
    );
  }
  if (entry.maxStackCount !== 0) {
    badges.push(
      <Badge variant="info">
        {t(
          (t) => t.game.ex.badge.infoMaxStackCount,
          {maxStackCount: entry.maxStackCount.toFixed(0)},
        )}
      </Badge>,
    );
  }
  if (entry.probabilityPct !== 0 && entry.probabilityPct !== 100) {
    badges.push(
      <Badge variant="info">
        {t(
          (t) => t.game.ex.badge.infoProbabilityPct,
          {probabilityPct: entry.probabilityPct.toFixed(0)},
        )}
      </Badge>,
    );
  }
  if (entry.targetAction[lang]) {
    badges.push(
      <Badge variant="info">
        {t(
          (t) => t.game.ex.badge.infoTargetAction,
          {targetAction: entry.targetAction[lang]},
        )}
      </Badge>,
    );
  }

  return badges;
};

export const filterExAbilityData = (exAbilityData: Array<CharaExAbilityDataEntry>, inputData: InputData) => {
  return exAbilityData.filter((entry) => {
    if (inputData.filter.elements.length && !inputData.filter.elements.includes(entry.chara.element)) {
      return false;
    }

    if (
      inputData.filter.exBuffParams.length > 0 &&
      !entry.ex.some((exEffect) => {
        return inputData.filter.exBuffParams.includes(exEffect.parameter.code);
      })
    ) {
      return false;
    }

    return inputData.filter.cexBuffParams.length === 0 ||
      entry.chainedEx.some((chainedExEffect) => {
        return inputData.filter.cexBuffParams.includes(chainedExEffect.parameter.code);
      });
  });
};
