import React from 'react';

import {useRouter} from 'next/router';
import Button from 'react-bootstrap/Button';

import {AuthPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';


export const LoginButton = () => {
  const {t} = useI18n();
  // Don't use `useNextRouter()` because `push` from such hook prepends `lang`
  const {asPath, push} = useRouter();

  const onClick = async () => {
    // `signIn()` from `next-auth` seems incorrectly redirecting the users
    // Also, it does not push history
    await push({
      pathname: AuthPath.SIGN_IN,
      query: {
        callbackUrl: asPath,
      },
    });
  };

  return (
    <Button variant="outline-success" onClick={onClick}>
      {t((t) => t.userControl.login)}
    </Button>
  );
};
