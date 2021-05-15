import React from 'react';

import {Button} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';

type Props = {
  fnSignOut: () => void,
}

export const LogoutButton = ({fnSignOut}: Props) => {
  const {t} = useI18n();

  return (
    <Button variant="outline-info" onClick={fnSignOut}>
      {t((t) => t.googleSignin.logout)}
    </Button>
  );
};
