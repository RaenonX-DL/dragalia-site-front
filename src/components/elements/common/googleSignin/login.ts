import {useRouter} from 'next/router';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin as useGoogleLoginDep,
} from 'react-google-login';

import {ApiResponseCode} from '../../../../api-def/api';
import {GOOGLE_CLIENT_ID} from '../../../../const/config';
import {CookiesKeys} from '../../../../utils/cookies/keys';
import {getCookies, removeCookies, setCookies} from '../../../../utils/cookies/utils';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {GoogleAnalytics} from '../../../../utils/services/ga';
import {GoogleLoginFailedResponse, GoogleSignInProps, isOfflineLogin} from './types';

export const useGoogleLogin = ({
  t,
  onFailed,
}: GoogleSignInProps) => {
  // FIXME: [Blocked by Auth Rework] Text content did not match (console error)
  const router = useRouter();

  return useGoogleLoginDep({
    clientId: GOOGLE_CLIENT_ID,
    onScriptLoadFailure: (error: any) => {
      console.error('Failed to load Google Sign-in script', error);
    },
    onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (isOfflineLogin(response)) {
        GoogleAnalytics.login('Google', false, 'offline_login_disallowed');
        onFailed({
          show: true,
          title: t((t) => t.googleSignin.loginFailed),
          message: t((t) => t.googleSignin.loginOfflineDisallowed),
        });
        return;
      }

      GoogleAnalytics.login('Google', true);

      const googleUid = response.getId();
      const googleEmail = response.getBasicProfile().getEmail();

      ApiRequestSender.userLogin(googleUid, googleEmail)
        .then((data) => {
          // Early terminate on API returning failure
          if (!data.success) {
            onFailed({
              show: true,
              title: t((t) => t.googleSignin.loginFailed),
              message: t(
                (t) => t.googleSignin.loginError,
                {
                  error: data.code.toString(),
                  details: ApiResponseCode[data.code],
                },
              ),
            });
            return;
          }
          if (setCookies(CookiesKeys.GOOGLE_UID, googleUid)) {
            router.reload();
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
    onFailure: (error: GoogleLoginFailedResponse) => {
      GoogleAnalytics.login('Google', false, error.error);

      console.error(error);

      // Do not display the error popup if the user blocked 3rd party cookies
      // because google sign-in will automatically execute upon visiting the website
      onFailed({
        show: error.error !== 'idpiframe_initialization_failed',
        title: t((t) => t.googleSignin.loginFailed),
        message: t(
          (t) => t.googleSignin.loginError,
          {
            error: error.error || '(unknown error)',
            details: error.details || 'N/A',
          },
        ),
        loginError: error,
      });
    },
    onAutoLoadFinished: (loggedIn: boolean) => {
      if (loggedIn) {
        return;
      }
      removeCookies(CookiesKeys.GOOGLE_UID);
    },
    isSignedIn: !!getCookies(CookiesKeys.GOOGLE_UID),
  });
};
