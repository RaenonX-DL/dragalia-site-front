import React from 'react';

import {useSession} from 'next-auth/react';

import {AccessDenied} from './accessDenied';


export const ProtectedLayout = ({children}: React.PropsWithChildren<{}>) => {
  const {data} = useSession();

  if (!data?.user.isAdmin) {
    return <AccessDenied/>;
  }

  return <>{children}</>;
};
