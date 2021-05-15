import React from 'react';

import {Button} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';

type Props = {
  fnSignIn: () => void,
}

export const LoginButton = ({fnSignIn}: Props) => {
  const {t} = useI18n();

  return (
    <Button variant="outline-success" onClick={fnSignIn}>
      {t((t) => t.googleSignin.login)}
    </Button>
  );
};
