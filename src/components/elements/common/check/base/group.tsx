import React from 'react';

import {CheckItemProps} from '../types';
import {CheckItem} from './item';
import styles from './main.module.css';


type Props<E> = {
  options: Array<E>,
  optionToProps: (entry: E) => CheckItemProps,
};

export const CheckItemGroup = <E, >({
  options,
  optionToProps,
}: Props<E>) => {
  return (
    <div className={styles['input-group']}>
      {options.map((option, idx) => <CheckItem key={idx} {...optionToProps(option)}/>)}
    </div>
  );
};
