import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-bootstrap';
import {useGoogleLogin, useGoogleLogout} from 'react-google-login';

import {ExpressModal} from './modalExpress';
import {ApiRequestSender} from '../../constants/api';
import {GOOGLE_CLIENT_ID} from '../../constants/config';


const STORAGE_KEY = 'X_GOOGLE_UID';


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

  const [modalLoginReqFailedShow, setModalLoginReqFailedShow] = React.useState(false);
  const [modalLoginReqFailedError, setModalLoginReqFailedError] = React.useState('');

  const modalLoginRequestFailed = (
    <ExpressModal
      title={t('google-signin.request-failed')} message={modalLoginReqFailedError}
      show={modalLoginReqFailedShow} setShow={setModalLoginReqFailedShow}
    />);

  const [modalLoginFailedShow, setModalLoginFailedShow] = React.useState(false);
  const [modalLoginFailedError, setModalLoginFailedError] = React.useState('');

  const modalLoginFailed = (
    <ExpressModal
      title={t('google-signin.login-failed')}
      message={t('google-signin.login-error', {errorCode: modalLoginFailedError})}
      show={modalLoginFailedShow} setShow={setModalLoginFailedShow}
    />);

  const [modalLogoutFailedShow, setModalLogoutFailedShow] = React.useState(false);

  const modalLogoutFailed = (
    <ExpressModal
      title={t('google-signin.logout-failed')} message={t('google-signin.logout-unknown')}
      show={modalLogoutFailedShow} setShow={setModalLogoutFailedShow}
    />);

  const sendUserLogin = (googleUid: string, googleEmail: string) => {
    ApiRequestSender.userLogin(googleUid, googleEmail)
      .then((response) => response.json())
      .then((data) => setLoggedIn(data.success))
      .catch((error) => {
        setModalLoginReqFailedShow(true);
        setModalLoginReqFailedError(JSON.stringify(error));
      });
  };

  const onLoginSuccess = (response) => {
    const googleUid = response.getId();
    const googleEmail = response.getBasicProfile().getEmail();

    sendUserLogin(googleUid, googleEmail);

    sessionStorage.setItem(STORAGE_KEY, googleUid);
  };

  const onLoginFailure = (response) => {
    setModalLoginFailedShow(true);
    setModalLoginFailedError(response.error || '(unknown error)');
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
    setModalLogoutFailedShow(true);
  };

  const {signOut} = useGoogleLogout({
    clientId: GOOGLE_CLIENT_ID,
    onLogoutSuccess: onLogoutSuccess,
    onFailure: onLogoutFailure,
  });

  const logoutButton = <Button onClick={signOut}>{t('google-signin.logout')}</Button>;
  const loginButton = <Button onClick={signIn}>{t('google-signin.login')}</Button>;

  return (
    <>
      {modalLoginRequestFailed}
      {modalLoginFailed}
      {modalLogoutFailed}
      {loggedIn ? logoutButton : loginButton}
    </>
  );
};
