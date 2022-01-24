import base64url from 'base64url';

import {UserConfigApi} from '../../../../api-def/api';
import {UserConfig} from './type';


export const normalizeConfig = (config: UserConfigApi): UserConfig => {
  return {
    subscriptionKeys: JSON.parse(base64url.decode(config.subscriptionKeysBase64)),
  };
};

export const convertConfigToApi = (config: UserConfig): UserConfigApi => {
  return {
    subscriptionKeysBase64: base64url.encode(JSON.stringify(config.subscriptionKeys)),
  };
};
