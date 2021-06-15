import React from 'react';

import {AppReactContext} from '../../../../context/app/main';


export const AdsWrapper = ({children}: React.PropsWithChildren<{}>) => {
  const context = React.useContext(AppReactContext);

  if (context?.session?.user.adsFreeExpiry) {
    return <></>;
  }

  return (
    <div className="mb-3">
      {children}
    </div>
  );
};
