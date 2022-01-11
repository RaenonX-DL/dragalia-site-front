import React from 'react';

import {useI18n} from '../../../i18n/hook';
import styles from '../main.module.css';
import {NavItemHeader} from '../type';


type Props = NavItemHeader;

export const NavHeader = ({text}: Props) => {
  const {t} = useI18n();
  const i18nText = t(text);

  return <h6 className={styles['nav-header']}>{i18nText}</h6>;
};
