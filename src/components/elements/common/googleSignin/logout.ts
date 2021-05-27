import {useGoogleLogout as useGoogleLogoutDep} from 'react-google-login';

import {GOOGLE_CLIENT_ID} from '../../../../const/config';
import {CookiesControl} from '../../../../utils/cookies';
import {GoogleSignOutProps} from './types';

export const useGoogleLogout = ({
  t,
  onFailed,
  failureInfo,
}: GoogleSignOutProps) => useGoogleLogoutDep({
  clientId: GOOGLE_CLIENT_ID,
  onLogoutSuccess: () => {
    CookiesControl.removeGoogleUid();
    window.location.reload();
  },
  onFailure: () => {
    if (failureInfo.loginError?.error === 'idpiframe_initialization_failed') {
      // Display error only if the login error is not init failed
      // - Caused by blocking the 3rd-party cookies
      return;
    }
    onFailed({
      show: true,
      title: t((t) => t.googleSignin.logoutFailed),
      message: t((t) => t.googleSignin.logoutUnknown),
    });
  },
});
