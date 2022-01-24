import {SubscriptionKeyConstName} from '../../../../../../api-def/api';
import {GetTranslationFunction} from '../../../../../../i18n/types';


export const constNameTranslations: {[name in SubscriptionKeyConstName]: GetTranslationFunction} = {
  ALL_QUEST: (t) => t.userControl.subscriptions.const.ALL_QUEST,
  ALL_MISC: (t) => t.userControl.subscriptions.const.ALL_MISC,
  ALL_TIER: (t) => t.userControl.subscriptions.const.ALL_TIER,
  ALL_ANALYSIS: (t) => t.userControl.subscriptions.const.ALL_ANALYSIS,
  ANNOUNCEMENT: (t) => t.userControl.subscriptions.const.ANNOUNCEMENT,
};
