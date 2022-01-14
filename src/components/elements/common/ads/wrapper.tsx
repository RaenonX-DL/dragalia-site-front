import React from 'react';

import {isProduction} from '../../../../api-def/utils';
import {AppReactContext} from '../../../../context/app/main';
import styles from './main.module.css';


type Props = React.PropsWithChildren<{
  className?: string,
}>;

export const AdsWrapper = ({children, className}: Props) => {
  const context = React.useContext(AppReactContext);

  const divClassName = `${className || 'mb-3'} ${isProduction() ? '' : styles['ads-test']}`;

  if (context?.session?.user.adsFreeExpiry) {
    return <div className={divClassName}/>;
  }

  return (
    <div className={divClassName}>
      {children}
    </div>
  );
};
