import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin as useGoogleLoginDep,
} from 'react-google-login';

import {GOOGLE_CLIENT_ID} from '../../../../const/config';
import {CookiesControl} from '../../../../utils/cookies';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../utils/services/ga';
import {GoogleSignInProps} from './types';

const isOfflineLogin = (response: any): response is GoogleLoginResponseOffline => {
  return 'code' in response;
};

export const useGoogleLogin = ({
  t,
  setFailedModal,
}: GoogleSignInProps) => useGoogleLoginDep({
  clientId: GOOGLE_CLIENT_ID,
  onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (isOfflineLogin(response)) {
      setFailedModal({
        show: true,
        title: t('google_signin.login_failed'),
        message: t('google_signin.login_offline_disallowed', {code: response.code}),
      });
      return;
    }

    GoogleAnalytics.login('Google', true);

    const googleUid = response.getId();
    const googleEmail = response.getBasicProfile().getEmail();

    ApiRequestSender.userLogin(googleUid, googleEmail)
      .then((data) => {
        if (!data.success) {
          return;
        }
        if (CookiesControl.setGoogleUid(googleUid)) {
          window.location.reload();
        }
      })
      .catch((error) => {
        setFailedModal({
          show: true,
          title: t('google_signin.request_failed'),
          message: JSON.stringify(error.toString()),
        });
      });
  },
  onFailure: (error: any) => {
    GoogleAnalytics.login('Google', false);

    setFailedModal({
      show: true,
      title: t('google_signin.login_failed'),
      message: t('google_signin.login_error', {error: error.error || '(unknown error)'}),
    });
  },
  onAutoLoadFinished: (loggedIn: boolean) => {
    if (loggedIn) {
      return;
    }
    CookiesControl.removeGoogleUid();
  },
  isSignedIn: true,
});
