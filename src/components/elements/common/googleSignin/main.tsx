import React from 'react';

import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
  useGoogleLogout,
} from 'react-google-login';
import Cookies from 'universal-cookie';

import {GOOGLE_CLIENT_ID} from '../../../../const/config';
import {useTranslation} from '../../../../i18n/utils';
import {ApiRequestSender} from '../../../../utils/services/api';
import {GoogleAnalytics} from '../../../../utils/services/ga';
import {CommonModal, ModalState} from '../modal';
import {LoginButton} from './login';
import {LogoutButton} from './logout';


const STORAGE_KEY = 'X_GOOGLE_UID';

const cookies = new Cookies();

export const getGoogleUid = (): string | null => {
  return cookies.get(STORAGE_KEY);
};

export const setGoogleUid = (googleUid: string) => {
  cookies.set(STORAGE_KEY, googleUid);
};

export const removeGoogleUid = () => {
  cookies.remove(STORAGE_KEY);
};

export const GoogleSigninButton = () => {
  const {t} = useTranslation();

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [failedModal, setFailedModal] = React.useState<ModalState>({
    show: false,
    title: '',
    message: '',
  });

  const sendUserLogin = (googleUid: string, googleEmail: string) => {
    ApiRequestSender.userLogin(googleUid, googleEmail)
      .then((data) => {
        setLoggedIn(data.success);
        setGoogleUid(googleUid);
      })
      .catch((error) => {
        setFailedModal({
          show: true,
          title: t('google_signin.request_failed'),
          message: JSON.stringify(error.toString()),
        });
      });
  };

  const isOfflineLogin = (response: any): response is GoogleLoginResponseOffline => {
    return 'code' in response;
  };

  const {signIn} = useGoogleLogin({
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

      sendUserLogin(googleUid, googleEmail);
    },
    onFailure: (error: any) => {
      GoogleAnalytics.login('Google', false);

      setFailedModal({
        show: true,
        title: t('google_signin.login_failed'),
        message: t('google_signin.login_error', {error: error.toString() || '(unknown error)'}),
      });
    },
    onAutoLoadFinished: (success: boolean) => {
      setLoggedIn(success);
    },
    isSignedIn: true,
  });

  const {signOut} = useGoogleLogout({
    clientId: GOOGLE_CLIENT_ID,
    onLogoutSuccess: () => {
      removeGoogleUid();
      setLoggedIn(false);
    },
    onFailure: () => {
      setFailedModal({
        show: true,
        title: t('google_signin.logout_failed'),
        message: t('google_signin.logout_unknown'),
      });
    },
  });

  return (
    <>
      {<CommonModal modalState={failedModal} setModalState={setFailedModal}/>}
      {
        loggedIn ?
          <LogoutButton fnSignOut={signOut}/> :
          <LoginButton fnSignIn={signIn}/>
      }
    </>
  );
};
