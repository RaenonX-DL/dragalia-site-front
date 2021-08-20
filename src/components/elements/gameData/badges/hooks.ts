import {useI18n} from '../../../../i18n/hook';
import {useAtkSkillResources} from '../../../hooks/atkSkillResources';
import {BadgeEntry, ConditionBadgeOptions} from './types';


export const useConditionBadges = ({conditionCodes}: ConditionBadgeOptions): Array<BadgeEntry> => {
  const {conditionEnumMap} = useAtkSkillResources({toFetch: 'conditionEnumsOnly'});
  const {lang} = useI18n();

  return conditionCodes.map((conditionCode) => {
    const conditionEnum = conditionEnumMap[String(conditionCode)];

    return {
      variant: conditionEnum?.colorTheme,
      content: conditionEnum?.trans[lang],
    };
  });
};
