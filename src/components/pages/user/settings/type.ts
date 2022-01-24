import {SubscriptionKey} from '../../../../api-def/api';
import {UseSubscriptionOptionToTextOptions} from './layout/subscriptions/hook';


export const SettingsType = {
  general: undefined,
  subscriptions: undefined,
};

export type SettingsTypeKey = keyof typeof SettingsType;

export type UserConfig = {
  subscriptionKeys: SubscriptionKey[],
};

export type ConfigLayoutProps = UseSubscriptionOptionToTextOptions & {
  config: UserConfig,
  setConfig: (newConfig: UserConfig) => void,
};
