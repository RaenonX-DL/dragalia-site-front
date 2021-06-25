import {GetTranslationFunction} from '../i18n/types';

/**
 * Class of the condition codes.
 *
 * This is synced with dragalia-data-parse, and should be changed as less as possible.
 *
 * Whenever it's possible, let the parser send the required resources instead.
 */
export enum ConditionCodes {
  NONE = 0,
  TARGET_BOGGED = 109,
  TARGET_ELEM_EFFECTIVE = 159,
  TARGET_STATE_BK = 180,
  TARGET_STATE_OD = 181,
}

export const conditionNameTransFunc: { [code in ConditionCodes]?: GetTranslationFunction } = {
  [ConditionCodes.NONE]: (t) => t.game.skillAtk.name.targetState.none,
  [ConditionCodes.TARGET_STATE_OD]: (t) => t.game.skillAtk.name.targetState.od,
  [ConditionCodes.TARGET_STATE_BK]: (t) => t.game.skillAtk.name.targetState.bk,
};
