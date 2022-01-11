import React from 'react';

import {useI18n} from '../../../i18n/hook';
import styles from '../main.module.css';
import {NavigationBody} from './body';


export const NavigationLandscape = () => {
  const {t} = useI18n();

  return (
    <>
      <div className={styles['nav-title']}>
        <h5>
          {t((t) => t.meta.inUse.site.title)}
        </h5>
      </div>
      <NavigationBody/>
    </>
  );
};
