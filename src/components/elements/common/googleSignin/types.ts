import {GoogleLoginResponseOffline} from 'react-google-login';

import {TFunction} from '../../../../i18n/types';
import {ModalState} from '../modal';

export const isOfflineLogin = (response: any): response is GoogleLoginResponseOffline => {
  return 'code' in response;
};

export type ButtonCommonProps = {
  loaded: boolean,
  onClickNotLoaded: () => void,
}

// Login Failure callback: https://www.npmjs.com/package/react-google-login (onFailure callback)

type GoogleLoginFailedPopupClosed = {
  error: 'popup_closed_by_user',
  details: undefined,
}

type GoogleLoginFailedIdpiInitFailed = {
  error: 'idpiframe_initialization_failed',
  details: string,
}

type GoogleLoginFailedAccessDenied = {
  error: 'access_denied',
  details: string,
}

type GoogleLoginFailedImmediate = {
  error: 'immediate_failed',
  details: string,
}

export type GoogleLoginFailedResponse = GoogleLoginFailedPopupClosed |
  GoogleLoginFailedIdpiInitFailed |
  GoogleLoginFailedAccessDenied |
  GoogleLoginFailedImmediate

export type FailureInfo = ModalState & {
  loginError?: GoogleLoginFailedResponse
};

export type GoogleSignInProps = {
  t: TFunction,
  onFailed: (failureInfo: FailureInfo) => void,
}

export type GoogleSignOutProps = GoogleSignInProps & {
  failureInfo: FailureInfo,
}
