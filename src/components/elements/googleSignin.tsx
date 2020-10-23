import React from 'react';
import {withTranslation} from 'react-i18next';
import {GoogleLogin, GoogleLoginResponse, GoogleLogout} from 'react-google-login';
import {Modal} from 'react-bootstrap';

import {I18nComponent, I18nProps} from '../base/I18nComponent';

type LoginFailedResponse = {
  error: string,
  details: string,
}

interface Props extends I18nProps {
  onLoginSuccess?: (googleUid: string, isAdmin: boolean) => void,
  onLoginFailure?: (response: LoginFailedResponse) => void,
  onLogoutSuccess?: () => void,
  onLogoutFailure?: () => void,
}

type States = {
  googleUid: string | null,
  isAdmin: boolean
}

// noinspection SpellCheckingInspection
const GOOGLE_CLIENT_ID = '431200420774-f3d6rkrb2btha5vr2jud9al6l8h509mq.apps.googleusercontent.com';


const bootstrapFailedModal = (title: string, message: string) => {
  return (
    <Modal>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
};

/**
 * A Google sign-in button.
 *
 * This class uses `react-google-login`.
 *
 * [Link to npm package]{@link https://www.npmjs.com/package/react-google-login}
 */
class GoogleSignin extends I18nComponent<Props, States> {
  /**
   * Construct a Google Signin button.
   *
   * @param {Props} props properties for initializing a Google sign-in button
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      googleUid: null,
      isAdmin: false,
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
    this.onLogoutFailure = this.onLogoutFailure.bind(this);
  }

  /**
   * Send a call to check if the user is admin.
   *
   * @param {number} googleUid Google UID to be checked
   * @return {boolean} if the user is admin
   */
  private static isAdmin(googleUid): boolean {
    return googleUid === 101524038922984790357;
  }

  /**
   * Render sign-in button if not logged in. Otherwise, render logout button.
   *
   * @return {JSX} Google Signin button
   */
  render() {
    if (this.isLoggedIn()) {
      return this.googleSignOutButton();
    } else {
      return this.googleSignInButton();
    }
  }

  /**
   * Check if the user is logged in.
   *
   * @return {boolean} user logged in.
   */
  private isLoggedIn(): boolean {
    return this.state.googleUid !== null;
  }

  /**
   * Reset all states to "not logged in".
   */
  private resetAllStates() {
    this.setState(() => ({
      googleUid: null,
      isAdmin: false,
    }));
  }

  /**
   * Method to be called upon login succeed.
   *
   * This will get the Google UID and check if the user is an admin, update the state,
   * then execute the method hook if any.
   *
   * @param {GoogleLoginResponse} response response received from Google
   */
  private onLoginSuccess(response: GoogleLoginResponse) {
    const googleUid = response.getId();
    const isAdmin = GoogleSignin.isAdmin(googleUid);

    this.setState(() => ({
      googleUid: googleUid,
      isAdmin: isAdmin,
    }));

    if (this.props.onLoginSuccess) {
      this.props.onLoginSuccess(googleUid, isAdmin);
    }
  }

  /**
   * Method to be called upon login failed.
   *
   * This will pop up a modal showing the errors, reset all the states, and execute the method hook if any.
   *
   * @param {LoginFailedResponse} response response received from Google
   */
  private onLoginFailure(response: LoginFailedResponse) {
    const errorCode = response.error || '(unknown error)';

    bootstrapFailedModal('Login failed', `Error code: ${errorCode}`);
    this.resetAllStates();

    if (this.props.onLoginFailure) {
      this.props.onLoginFailure(response);
    }
  }

  /**
   * Method to be called upon logout succeed.
   *
   * This will reset all the states.
   */
  private onLogoutSuccess() {
    this.resetAllStates();

    if (this.props.onLogoutSuccess) {
      this.props.onLogoutSuccess();
    }
  }

  /**
   * Method to be called upon logout failed.
   *
   * This will pop up a modal showing the errors and execute the method hook if any.
   */
  private onLogoutFailure() {
    bootstrapFailedModal('Logout failed', 'Failed to logout for unknown reason.');

    if (this.props.onLogoutFailure) {
      this.props.onLogoutFailure();
    }
  }

  /**
   * JSX of the Google sign-in button.
   *
   * @return {JSX} Google sign-in button
   */
  private googleSignInButton() {
    return (
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText={this.props.t('googleSignin.login')}
        theme="dark"
        // @ts-ignore
        onSuccess={this.onLoginSuccess}
        onFailure={this.onLoginFailure}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      />
    );
  }

  /**
   * JSX of the Google sign-out button.
   *
   * @return {JSX} Google sign-out button
   */
  private googleSignOutButton() {
    return (
      <GoogleLogout
        clientId={GOOGLE_CLIENT_ID}
        buttonText={this.props.t('googleSignin.logout')}
        // @ts-ignore
        theme="dark"
        onLogoutSuccess={this.onLogoutSuccess}
        onFailure={this.onLogoutFailure}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
}

export default withTranslation()(GoogleSignin);
