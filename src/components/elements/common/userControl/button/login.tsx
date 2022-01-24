import React from 'react';

import Button from 'react-bootstrap/Button';
import urlJoin from 'url-join';

import {AuthPath} from '../../../../../api-def/paths';
import {PARAM_REDIRECT_PATH} from '../../../../../const/auth';
import {useI18n} from '../../../../../i18n/hook';
import {useNextRouter} from '../../../../../utils/router';


export const LoginButton = () => {
  const {t} = useI18n();
  const {asPath} = useNextRouter();

  const urlParams = new URLSearchParams(window.location.search);

  urlParams.set(PARAM_REDIRECT_PATH, asPath);

  return (
    <Button
      variant="outline-success"
      href={urlJoin(AuthPath.SIGN_IN, `?${urlParams.toString()}`)}
      className="bg-gradient"
    >
      {t((t) => t.userControl.login)}
    </Button>
  );
};
