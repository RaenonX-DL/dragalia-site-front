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
  onFailed,
}: GoogleSignInProps) => useGoogleLoginDep({
  clientId: GOOGLE_CLIENT_ID,
  onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (isOfflineLogin(response)) {
      onFailed({
        show: true,
        title: t((t) => t.googleSignin.loginFailed),
        message: t(
          (t) => t.googleSignin.loginOfflineDisallowed,
          {code: response.code},
        ),
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
        onFailed({
          show: true,
          title: t((t) => t.googleSignin.requestFailed),
          message: JSON.stringify(error.toString()),
        });
      });
  },
  onFailure: (error: any) => {
    GoogleAnalytics.login('Google', false);

    onFailed({
      show: true,
      title: t((t) => t.googleSignin.loginFailed),
      message: t(
        (t) => t.googleSignin.loginError,
        {error: error.error || '(unknown error)'},
      ),
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
