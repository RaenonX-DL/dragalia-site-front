import React from 'react';

import {useSession} from 'next-auth/react';

import {isProduction} from '../../../../api-def/utils';
import styles from './main.module.css';


type Props = React.PropsWithChildren<{
  className?: string,
}>;

export const AdsWrapper = ({children, className}: Props) => {
  const {data} = useSession();

  const divClassName = `${className || 'mb-3'} ${isProduction() ? '' : styles['ads-test']}`;

  if (data?.user.adsFreeExpiry) {
    return <div className={divClassName}/>;
  }

  return (
    <div className={divClassName}>
      {children}
    </div>
  );
};
