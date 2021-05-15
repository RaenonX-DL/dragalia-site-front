import React from 'react';

import {useI18n} from '../../../../i18n/hook';
import {alertDispatchers} from '../../../../state/alert/dispatchers';
import {useDispatch} from '../../../../state/store';
import {useGoogleLogin} from './login';

export const LoginPrompt = () => {
  const {t} = useI18n();
  const dispatch = useDispatch();

  const {signIn} = useGoogleLogin({
    t,
    onFailed: ({show, title, message}) => {
      dispatch(alertDispatchers.showAlert({
        show,
        message: `##### ${title}\n-----\n${message}`,
        variant: 'danger',
      }));
    },
  });

  signIn();

  return <></>;
};
