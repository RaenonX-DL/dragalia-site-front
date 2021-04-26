import React from 'react';

import {Button} from 'react-bootstrap';

import {useTranslation} from '../../../../i18n/utils';

type Props = {
  fnSignIn: () => void,
}

export const LoginButton = ({fnSignIn}: Props) => {
  const {t} = useTranslation();

  return (
    <Button variant="outline-success" onClick={fnSignIn}>
      {t('google_signin.login')}
    </Button>
  );
};
