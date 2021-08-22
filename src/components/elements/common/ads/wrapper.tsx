import React from 'react';

import {AppReactContext} from '../../../../context/app/main';


type Props = React.PropsWithChildren<{
  className?: string,
}>

export const AdsWrapper = ({children, className}: Props) => {
  const context = React.useContext(AppReactContext);

  const divClassName = className ?? 'mb-3';

  if (context?.session?.user.adsFreeExpiry) {
    return <div className={divClassName}/>;
  }

  return (
    <div className={divClassName}>
      {children}
    </div>
  );
};
