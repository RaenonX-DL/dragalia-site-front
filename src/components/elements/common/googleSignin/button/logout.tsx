import React from 'react';

import {Button} from 'react-bootstrap';

import {useI18n} from '../../../../../i18n/hook';
import {ButtonCommonProps} from '../types';

type Props = ButtonCommonProps & {
  fnSignOut: () => void,
}

export const LogoutButton = ({fnSignOut, loaded, onClickNotLoaded}: Props) => {
  const {t} = useI18n();

  return (
    <Button
      variant="outline-info"
      onClick={loaded ? fnSignOut : onClickNotLoaded}
    >
      {t((t) => t.googleSignin.logout)}
    </Button>
  );
};
