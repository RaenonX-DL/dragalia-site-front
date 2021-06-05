import {useRouter} from 'next/router';
import {useGoogleLogout as useGoogleLogoutDep} from 'react-google-login';

import {GOOGLE_CLIENT_ID} from '../../../../const/config';
import {CookiesKeys} from '../../../../utils/cookies/keys';
import {removeCookies} from '../../../../utils/cookies/utils';
import {GoogleSignOutProps} from './types';


export const useGoogleLogout = ({
  t,
  onFailed,
  failureInfo,
}: GoogleSignOutProps) => {
  const router = useRouter();

  return useGoogleLogoutDep({
    clientId: GOOGLE_CLIENT_ID,
    onLogoutSuccess: () => {
      removeCookies(CookiesKeys.GOOGLE_UID);
      router.reload();
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
};
