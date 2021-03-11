import React from 'react';
import {Button} from 'react-bootstrap';
import {useGoogleLogin, useGoogleLogout} from 'react-google-login';
import {useTranslation} from 'react-i18next';
import Cookies from 'universal-cookie';
import {GOOGLE_CLIENT_ID} from '../../constants/config';
import {ApiRequestSender} from '../../utils/services/api';
import {GoogleAnalytics} from '../../utils/services/ga';

import {ExpressModal} from './express';


const STORAGE_KEY = 'X_GOOGLE_UID';


export type ModalState = {
  show: boolean,
  title: string,
  message: string
}

const cookies = new Cookies();


/**
 * Get the Google UID from the storage if logged in. Returns `null` if not logged in.
 *
 * @return {string | null} Google UID if logged in, `null` otherwise
 */
export function getGoogleUid(): string | null {
  return cookies.get(STORAGE_KEY);
}

/**
 * Set the Google UID to the storage.
 *
 * @param {string} googleUid Google UID to set.
 */
export function setGoogleUid(googleUid: string) {
  cookies.set(STORAGE_KEY, googleUid);
}

/**
 * Remove the Google UID in the storage.
 */
export function removeGoogleUid() {
  cookies.remove(STORAGE_KEY);
}


export const GoogleSigninButton = () => {
  const {t} = useTranslation();

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [modalLoginFailedState, setModalLoginFailedState] = React.useState<ModalState>(
    {show: false, title: '', message: ''},
  );

  const modalLoginFailed = (
    <ExpressModal
      title={modalLoginFailedState.title} message={modalLoginFailedState.message}
      show={modalLoginFailedState.show}
      fnHideModal={() => setModalLoginFailedState({show: false, title: '', message: ''})}
    />);

  const sendUserLogin = (googleUid: string, googleEmail: string) => {
    ApiRequestSender.userLogin(googleUid, googleEmail)
      .then((data) => setLoggedIn(data.success))
      .catch((error) => {
        setModalLoginFailedState({
          show: true,
          title: t('google_signin.request_failed'),
          message: JSON.stringify(error.toString()),
        });
      });
  };

  const onLoginSuccess = (response) => {
    GoogleAnalytics.login('Google', true);

    const googleUid = response.getId();
    const googleEmail = response.getBasicProfile().getEmail();

    sendUserLogin(googleUid, googleEmail);

    setGoogleUid(googleUid);
  };

  const onLoginFailure = (response) => {
    GoogleAnalytics.login('Google', false);

    setModalLoginFailedState({
      show: true,
      title: t('google_signin.login_failed'),
      message: t('google_signin.login_error', {error: response.toString() || '(unknown error)'}),
    });
  };

  const onLoginAutoloadCompleted = (success: boolean) => {
    setLoggedIn(success);
  };

  const {signIn} = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
    onSuccess: onLoginSuccess,
    onFailure: onLoginFailure,
    onAutoLoadFinished: onLoginAutoloadCompleted,
    isSignedIn: true,
  });

  const onLogoutSuccess = () => {
    removeGoogleUid();
    setLoggedIn(false);
  };

  const onLogoutFailure = () => {
    setModalLoginFailedState({
      show: true,
      title: t('google_signin.logout_failed'),
      message: t('google_signin.logout_unknown'),
    });
  };

  const {signOut} = useGoogleLogout({
    clientId: GOOGLE_CLIENT_ID,
    onLogoutSuccess: onLogoutSuccess,
    onFailure: onLogoutFailure,
  });

  const logoutButton = <Button variant="outline-info" onClick={signOut}>{t('google_signin.logout')}</Button>;
  const loginButton = <Button variant="outline-success" onClick={signIn}>{t('google_signin.login')}</Button>;

  return (
    <>
      {modalLoginFailed}
      {loggedIn ? logoutButton : loginButton}
    </>
  );
};
