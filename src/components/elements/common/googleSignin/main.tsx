import React from 'react';

import {useI18n} from '../../../../i18n/hook';
import {CookiesKeys} from '../../../../utils/cookies/keys';
import {getCookies} from '../../../../utils/cookies/utils';
import {CommonModal} from '../modal';
import {LoginButton} from './button/login';
import {LogoutButton} from './button/logout';
import {useGoogleLogin} from './login';
import {useGoogleLogout} from './logout';
import {FailureInfo} from './types';

export const GoogleSigninButton = () => {
  const {t} = useI18n();

  const [failureInfo, setFailureInfo] = React.useState<FailureInfo>({
    show: false,
    title: '',
    message: '',
  });

  const payload = {t, onFailed: setFailureInfo};

  const {signIn, loaded: signInLoaded} = useGoogleLogin(payload);
  const {signOut, loaded: signOutLoaded} = useGoogleLogout({...payload, failureInfo});

  const onClickNotLoaded = () => {
    setFailureInfo({
      show: true,
      title: t((t) => t.googleSignin.loginFailed),
      message: t((t) => t.googleSignin.notLoaded),
    });
  };

  return (
    <>
      <CommonModal modalState={failureInfo} setModalState={setFailureInfo}/>
      {
        getCookies(CookiesKeys.GOOGLE_UID) ?
          <LogoutButton
            fnSignOut={signOut}
            loaded={signOutLoaded}
            onClickNotLoaded={onClickNotLoaded}
          /> :
          <LoginButton
            fnSignIn={signIn}
            loaded={signInLoaded}
            onClickNotLoaded={onClickNotLoaded}
          />
      }
    </>
  );
};
