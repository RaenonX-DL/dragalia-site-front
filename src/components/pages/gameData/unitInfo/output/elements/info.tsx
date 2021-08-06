import React from 'react';

import styles from './main.module.css';


export const InfoBlock = ({children}: React.PropsWithChildren<{}>) => {
  return (
    <div className={styles.text}>
      {children}
    </div>
  );
};
