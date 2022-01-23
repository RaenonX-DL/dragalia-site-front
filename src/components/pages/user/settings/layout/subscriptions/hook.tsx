import {PostType, SubscriptionKey} from '../../../../../../api-def/api';
import {FuncGetUnitName} from '../../../../../../api-def/resources';
import {useI18n} from '../../../../../../i18n/hook';
import {constNameTranslations} from './const';


export type UseSubscriptionOptionToTextOptions = {
  getUnitName: FuncGetUnitName,
};

type UseSubscriptionOptionToTextReturn = {
  keyToText: (subscriptionKey: SubscriptionKey) => string,
};

export const useSubscriptionOptionToText = ({
  getUnitName,
}: UseSubscriptionOptionToTextOptions): UseSubscriptionOptionToTextReturn => {
  const {t, lang} = useI18n();

  const keyToText = (key: SubscriptionKey) => {
    if (key.type === 'const') {
      return t(constNameTranslations[key.name]);
    } else if (key.type === 'post') {
      if (key.postType === PostType.ANALYSIS) {
        return `${t((t) => t.enum.postType[key.postType])} - ${getUnitName(key.id, lang)}`;
      }

      return `${t((t) => t.enum.postType[key.postType])} #${key.id}`;
    }

    const keyString = JSON.stringify(key);
    console.warn(`Unhandled subscription key: ${keyString}`);
    return keyString;
  };

  return {keyToText};
};
