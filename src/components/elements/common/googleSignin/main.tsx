import React from 'react';

import {useTranslation} from '../../../../i18n/utils';
import {CookiesControl} from '../../../../utils/cookies';
import {CommonModal, ModalState} from '../modal';
import {LoginButton} from './button/login';
import {LogoutButton} from './button/logout';
import {useGoogleLogin} from './login';
import {useGoogleLogout} from './logout';

export const GoogleSigninButton = () => {
  const {t} = useTranslation();

  const [failedModal, setFailedModal] = React.useState<ModalState>({
    show: false,
    title: '',
    message: '',
  });

  const payload = {t, onFailed: setFailedModal};

  const {signIn} = useGoogleLogin(payload);
  const {signOut} = useGoogleLogout(payload);

  return (
    <>
      <CommonModal modalState={failedModal} setModalState={setFailedModal}/>
      {
        CookiesControl.getGoogleUid() ?
          <LogoutButton fnSignOut={signOut}/> :
          <LoginButton fnSignIn={signIn}/>
      }
    </>
  );
};
