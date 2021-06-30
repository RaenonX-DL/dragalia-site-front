import {ConditionCodes, conditionNameTransFunc} from '../../const/gameData';
import {TFunction} from '../../i18n/types';


export const getConditionName = (condition: ConditionCodes, t: TFunction): string => {
  const transFunc = conditionNameTransFunc[condition];

  if (!transFunc) {
    return ConditionCodes[condition];
  }

  return t(transFunc);
};
