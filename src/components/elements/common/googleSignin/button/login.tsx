import React from 'react';

import {Button} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {ButtonCommonProps} from '../types';

type Props = ButtonCommonProps & {
  fnSignIn: () => void,
}

export const LoginButton = ({fnSignIn, loaded, onClickNotLoaded}: Props) => {
  const {t} = useI18n();

  return (
    <Button
      variant="outline-success"
      onClick={loaded ? fnSignIn : onClickNotLoaded}
    >
      {t((t) => t.googleSignin.login)}
    </Button>
  );
};
