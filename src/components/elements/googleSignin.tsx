import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-bootstrap';
import {useGoogleLogin, useGoogleLogout} from 'react-google-login';

import {ExpressModal} from './modalExpress';
import {ApiRequestSender} from '../../constants/api';
import {GOOGLE_CLIENT_ID} from '../../constants/config';


const STORAGE_KEY = 'X_GOOGLE_UID';


export type ModalState = {
  show: boolean,
  title: string,
  message: string
}


/**
 * Get the Google UID if logged in. Returns `null` if not logged in.
 *
 * @return {string | null} Google UID if logger in
 */
export function getGoogleUid(): string | null {
  return sessionStorage.getItem(STORAGE_KEY);
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
    const googleUid = response.getId();
    const googleEmail = response.getBasicProfile().getEmail();

    sendUserLogin(googleUid, googleEmail);

    sessionStorage.setItem(STORAGE_KEY, googleUid);
  };

  const onLoginFailure = (response) => {
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
    sessionStorage.removeItem(STORAGE_KEY);
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
