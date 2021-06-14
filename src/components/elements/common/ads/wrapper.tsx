import React from 'react';

import {useSession} from 'next-auth/client';


export const AdsWrapper = ({children}: React.PropsWithChildren<{}>) => {
  const [session, loading] = useSession();

  if (loading || !!session?.user.adsFreeExpiry) {
    return <></>;
  }

  return (
    <div className="mb-3">
      {children}
    </div>
  );
};
