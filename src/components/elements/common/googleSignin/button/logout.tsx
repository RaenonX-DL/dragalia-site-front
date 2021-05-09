import React from 'react';

import {Button} from 'react-bootstrap';

import {useTranslation} from '../../../../../i18n/utils';

type Props = {
  fnSignOut: () => void,
}

export const LogoutButton = ({fnSignOut}: Props) => {
  const {t} = useTranslation();

  return (
    <Button variant="outline-info" onClick={fnSignOut}>
      {t('google_signin.logout')}
    </Button>
  );
};
