import {AbilityVariantEffectUnitData, ConditionEnumMap} from '../../../../../api-def/resources';
import {useI18n} from '../../../../../i18n/hook';
import {useConditionBadges} from '../../../../elements/gameData/badges/hooks';
import {BadgeEntry} from '../../../../elements/gameData/badges/types';


export const useAbilityVariantEffectBadges = (
  entry: AbilityVariantEffectUnitData,
  conditionEnums: ConditionEnumMap,
  skipOccurrences: boolean = false,
): Array<BadgeEntry> => {
  const {t, lang} = useI18n();

  const badges = useConditionBadges({conditionCodes: entry.conditions});

  if (entry.cooldownSec !== 0) {
    badges.push({
      variant: 'info',
      content: t(
        (t) => t.game.ex.badge.infoCooldown,
        {cooldownSec: entry.cooldownSec.toFixed(0)},
      ),
    });
  }
  if (entry.durationCount !== 0) {
    badges.push({
      variant: 'info',
      content: t(
        (t) => t.game.ex.badge.infoDurationCount,
        {durationCount: entry.durationCount.toFixed(0)},
      ),
    });
  }
  if (entry.durationSec !== 0) {
    badges.push({
      variant: 'info',
      content: t(
        (t) => t.game.ex.badge.infoDurationSec,
        {durationSec: entry.durationSec.toFixed(0)},
      ),
    });
  }
  if (!skipOccurrences && entry.maxOccurrences !== 0) {
    badges.push({
      variant: 'info',
      content: t(
        (t) => t.game.ex.badge.infoMaxOccurrences,
        {maxOccurrences: entry.maxOccurrences.toFixed(0)},
      ),
    });
  }
  if (entry.maxStackCount !== 0) {
    badges.push({
      variant: 'info',
      content: t(
        (t) => t.game.ex.badge.infoMaxStackCount,
        {maxStackCount: entry.maxStackCount.toFixed(0)},
      ),
    });
  }
  if (entry.probabilityPct !== 0 && entry.probabilityPct !== 100) {
    badges.push({
      variant: 'info',
      content: t(
        (t) => t.game.ex.badge.infoProbabilityPct,
        {probabilityPct: entry.probabilityPct.toFixed(0)},
      ),
    });
  }
  if (entry.targetAction[lang]) {
    badges.push({
      variant: 'info',
      content: t(
        (t) => t.game.ex.badge.infoTargetAction,
        {targetAction: entry.targetAction[lang]},
      ),
    });
  }

  return badges;
};
