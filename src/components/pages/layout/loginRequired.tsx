import React from 'react';

import {useSession} from 'next-auth/react';
import Alert from 'react-bootstrap/Alert';

import {useI18n} from '../../../i18n/hook';


export const LoginRequiredLayout = ({children}: React.PropsWithChildren<{}>) => {
  const {t} = useI18n();
  const {data} = useSession();

  if (!data) {
    return (
      <Alert variant="danger">
        {t((t) => t.message.error.auth.loginRequired)}
      </Alert>
    );
  }

  return <>{children}</>;
};
